import React, { useEffect, useState } from 'react';
import styles from './css/TransactionForm.module.css';

interface Transaction {
  _id?: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'Expense' | 'Income';
}

interface TransactionFormProps {
  userId: string; // Pass the logged-in user's ID
  onAddTransaction: (transaction: Omit<Transaction, "_id">) => Promise<void>;
  onRemoveTransaction: (index: number) => Promise<void>;
  onEditTransaction: (index: number, updatedTransaction: Transaction) => Promise<void>;
}

const expenseCategories = ["Food", "Utilities", "Entertainment", "Healthcare"];
const incomeCategories = ["Salary", "Freelancing", "Investments", "Gifts"];

const TransactionForm: React.FC<TransactionFormProps> = ({ userId, onAddTransaction, onRemoveTransaction, onEditTransaction }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<string>(expenseCategories[0]);
  const [type, setType] = useState<'Expense' | 'Income'>('Expense');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch transactions on mount or when userId changes
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/transactions`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data); // Update transactions state
      } catch (error) {
        console.error(error);
        setFetchError(error.message);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};
    
    // Validate form inputs
    if (!date) newErrors.date = 'Date is required';
    if (amount === '' || isNaN(Number(amount))) newErrors.amount = 'Amount must be a number';
    if (description.length > 50) newErrors.description = 'Description must be 50 characters or less';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if errors exist
    }

    setErrors({}); // Clear errors

    const transaction: Transaction = {
      date,
      description,
      amount: Number(amount),
      category,
      type,
    };

    try {
      if (editIndex !== null) {
        // Update existing transaction
        const id = transactions[editIndex]._id; // Use existing transaction ID
        const response = await fetch(`/api/users/${userId}/transactions/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        });
        if (!response.ok) throw new Error('Failed to update transaction');

        const updatedTransactions = [...transactions];
        updatedTransactions[editIndex] = { ...transaction, _id: id }; // Retain the ID
        setTransactions(updatedTransactions); // Update state with modified transactions
      } else {
        // Add new transaction
        const response = await fetch(`/api/users/${userId}/transactions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        });
        if (!response.ok) throw new Error('Failed to add transaction');

        const newTransaction = await response.json();
        setTransactions((prev) => [...prev, newTransaction]); // Append new transaction to state
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      setFetchError(error.message);
    }

    resetForm(); // Reset form fields
  };

  const handleRemove = async (index: number) => {
    const id = transactions[index]._id; // Use existing transaction ID
    try {
      const response = await fetch(`/api/users/${userId}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete transaction');

      // Update the transactions state
      setTransactions((prev) => prev.filter((_, i) => i !== index)); // Filter out the deleted transaction
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setFetchError(error.message);
    }
  };

  const resetForm = () => {
    setDate('');
    setDescription('');
    setAmount('');
    setCategory(type === 'Expense' ? expenseCategories[0] : incomeCategories[0]);
    setEditIndex(null);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <div className={`${styles.formField} ${styles.transactionTypeContainer}`}>
            <div 
              className={`${styles.transactionTypeLabel} ${type === 'Expense' ? styles.active : ''}`} 
              onClick={() => setType('Expense')}
            >
              <input 
                type="radio" 
                className={styles.hiddenRadio} 
                checked={type === 'Expense'} 
                onChange={() => setType('Expense')} 
              />
              <div className={styles.squareButton}></div>
              Expense
            </div>
            <div 
              className={`${styles.transactionTypeLabel} ${type === 'Income' ? styles.active : ''}`} 
              onClick={() => setType('Income')}
            >
              <input 
                type="radio" 
                className={styles.hiddenRadio} 
                checked={type === 'Income'} 
                onChange={() => setType('Income')} 
              />
              <div className={styles.squareButton}></div>
              Income
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className={styles.formInput} 
            />
            {errors.date && <p className={styles.formError}>{errors.date}</p>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className={styles.formInput} 
            />
            {errors.description && <p className={styles.formError}>{errors.description}</p>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Amount</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value) || '')} 
              className={styles.formInput} 
            />
            {errors.amount && <p className={styles.formError}>{errors.amount}</p>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className={styles.formSelect}
            >
              {(type === 'Expense' ? expenseCategories : incomeCategories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              {editIndex !== null ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </form>

      {fetchError && <p className={styles.errorMessage}>{fetchError}</p>}

      <div className={styles.transactionList}>
        {transactions.map((transaction, index) => (
          <div key={transaction._id} className={styles.transactionItem}>
            <p>{transaction.date} - {transaction.description} - ${transaction.amount} - {transaction.category}</p>
            <button onClick={() => handleRemove(index)} className={styles.removeButton}>
              Remove
            </button>
            <button onClick={() => {
              setEditIndex(index);
              setDate(transaction.date);
              setDescription(transaction.description);
              setAmount(transaction.amount);
              setCategory(transaction.category);
              setType(transaction.type);
            }} className={styles.editButton}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionForm;
