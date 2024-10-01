import React, { useState, useEffect } from 'react';
import styles from './css/TransactionForm.module.css';

interface Transaction {
  _id?: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income'; // Keep type as 'expense' | 'income'
}

interface TransactionFormProps {
  userId: string; // Pass the logged-in user's ID
  onAddTransaction: (transaction: Omit<Transaction, "_id">) => Promise<void>; // Keep this prop
  onUpdateBalance: (amount: number) => void; // Add prop for updating balance
  initialTransaction?: Transaction; // Add the initialTransaction prop
}

const expenseCategories = ["Food", "Utilities", "Entertainment", "Healthcare"];
const incomeCategories = ["Salary", "Freelancing", "Investments", "Gifts"];

const TransactionForm: React.FC<TransactionFormProps> = ({
  userId,
  onAddTransaction,
  onUpdateBalance,
  initialTransaction // Destructure initialTransaction
}) => {
  // State initializations
  const [date, setDate] = useState<string>(initialTransaction?.date || '');
  const [description, setDescription] = useState<string>(initialTransaction?.description || '');
  const [amount, setAmount] = useState<number | ''>(initialTransaction?.amount || '');
  const [category, setCategory] = useState<string>(
    initialTransaction?.category || expenseCategories[0]
  );
  const [type, setType] = useState<'expense' | 'income'>(
    initialTransaction?.type || 'expense'
  );
  const [error, setError] = useState<string>(''); // Error state

  // Effect to reset form fields when initialTransaction changes
  useEffect(() => {
    if (initialTransaction) {
      setDate(new Date(initialTransaction.date).toISOString().split('T')[0]); // Format date to 'YYYY-MM-DD'
      setDescription(initialTransaction.description);
      setAmount(initialTransaction.amount);
      setCategory(initialTransaction.category);
      setType(initialTransaction.type);
    } else {
      resetForm(); // Reset to default values if no initialTransaction
    }
  }, [initialTransaction]);

  const handleTypeChange = (newType: 'expense' | 'income') => {
    setType(newType);
    // Adjust category based on new type
    if (newType === 'expense') {
      setCategory(expenseCategories[0]); // Default to first expense category
    } else {
      setCategory(incomeCategories[0]); // Default to first income category
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!date || !description || amount === '' || amount < 0) {
      setError('Please fill out all fields with valid inputs.'); // Set error message
      return;
    }

    if (description.length > 50) {
      return;
    }

    const transaction = {
      _id: initialTransaction?._id, // Include the _id for editing
      date,
      description,
      amount,
      category,
      type,
    };

    try {
      await onAddTransaction(transaction); // Call the onAddTransaction prop
      
      // Update balance based on transaction type
      const balanceChange = type === 'income' ? Number(amount) : -Number(amount);
      onUpdateBalance(balanceChange); // Update balance based on the type
      resetForm(); // Reset form after successful transaction
    } catch (err) {
      setError('Failed to add transaction.'); // Handle error if transaction fails
    }
  };

  const resetForm = () => {
    setDate('');
    setDescription('');
    setAmount('');
    setCategory(type === 'expense' ? expenseCategories[0] : incomeCategories[0]);
    setError(''); // Reset error message
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>} {/* Display error message */}

        <div className={styles.formFields}>
          <div className={`${styles.formField} ${styles.transactionTypeContainer}`}>
            <label className={`${styles.transactionTypeLabel} ${type === 'expense' ? styles.active : ''}`}>
              <input
                type="radio"
                className={styles.hiddenRadio}
                checked={type === 'expense'}
                onChange={() => handleTypeChange('expense')} // Use handler to change type
              />
              <div className={styles.squareButton}></div>
              Expense
            </label>
            <label className={`${styles.transactionTypeLabel} ${type === 'income' ? styles.active : ''}`}>
              <input
                type="radio"
                className={styles.hiddenRadio}
                checked={type === 'income'}
                onChange={() => handleTypeChange('income')} // Use handler to change type
              />
              <div className={styles.squareButton}></div>
              Income
            </label>
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.formInput}
              required
              placeholder="Max 50 characters"
            />
            {description.length > 50 && (
              <div className={styles.error}>Description cannot exceed 50 characters.</div>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
              className={styles.formInput}
              required
              min={0} // Set minimum amount to 0
              max={100000000} // Set a reasonable maximum amount (adjust as necessary)
              step="0.01" // Allow decimal values
              placeholder='$'
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.formSelect}
            >
              {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              {initialTransaction ? 'Update Transaction' : 'Add Transaction'} {/* Change button text */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
