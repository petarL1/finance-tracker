
import React, { useState } from 'react';
import styles from './css/TransactionForm.module.css';

interface TransactionFormProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
  onRemoveTransaction: (index: number) => void; // Remove handler
  onEditTransaction: (index: number, transaction: Transaction) => void; // Edit handler
}

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'Expense' | 'Income';
}

// Separate categories for Expense and Income
const expenseCategories = ["Food", "Utilities", "Entertainment", "Healthcare"];
const incomeCategories = ["Salary", "Freelancing", "Investments", "Gifts"];

const TransactionForm: React.FC<TransactionFormProps> = ({ transactions, onAddTransaction, onRemoveTransaction, onEditTransaction }) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<string>(expenseCategories[0]); // Default to first expense category
  const [type, setType] = useState<'Expense' | 'Income'>('Expense'); // Default is 'Expense'
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editIndex, setEditIndex] = useState<number | null>(null); // Edit state to track which transaction is being edited

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!date) newErrors.date = 'Date is required';
    if (amount === '' || isNaN(Number(amount))) newErrors.amount = 'Amount must be a number';
    if (description.length > 50) newErrors.description = 'Description must be 50 characters or less';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const transaction: Transaction = {
      date,
      description,
      amount: Number(amount),
      category,
      type,
    };

    if (editIndex !== null) {
      // If editing, update the transaction at the editIndex
      onEditTransaction(editIndex, transaction);
      setEditIndex(null); // Reset editIndex after editing
    } else {
      // If not editing, add a new transaction
      onAddTransaction(transaction);
    }

    // Reset form after submit
    setDescription('');
    setAmount('');
    setCategory(type === 'Expense' ? expenseCategories[0] : incomeCategories[0]); // Reset category
  };

  const handleEdit = (index: number) => {
    const transactionToEdit = transactions[index];
    setDate(transactionToEdit.date);
    setDescription(transactionToEdit.description);
    setAmount(transactionToEdit.amount);
    setCategory(transactionToEdit.category);
    setType(transactionToEdit.type);
    setEditIndex(index); // Set the current transaction index to edit
  };

  const handleRemove = (index: number) => {
    onRemoveTransaction(index);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const maxVisibleButtons = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let end = Math.min(totalPages, start + maxVisibleButtons - 1);

    if (end - start < maxVisibleButtons) {
      start = Math.max(1, end - maxVisibleButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => (
      <button
        key={index + start}
        onClick={() => handlePageChange(index + start)}
        className={currentPage === index + start ? styles.activePage : ''}
      >
        {index + start}
      </button>
    ));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.transactionTypeContainer}>
            <label className={`${styles.transactionTypeLabel} ${type === 'Expense' ? styles.active : ''}`}>
              <input
                type="radio"
                name="type"
                value="Expense"
                checked={type === 'Expense'}
                onChange={() => {
                  setType('Expense');
                  setCategory(expenseCategories[0]); // Reset to first expense category
                }}
                className={styles.hiddenRadio}
              />
              <span className={styles.squareButton} />
              Expense
            </label>
            <label className={`${styles.transactionTypeLabel} ${type === 'Income' ? styles.active : ''}`}>
              <input
                type="radio"
                name="type"
                value="Income"
                checked={type === 'Income'}
                onChange={() => {
                  setType('Income');
                  setCategory(incomeCategories[0]); // Reset to first income category
                }}
                className={styles.hiddenRadio}
              />
              <span className={styles.squareButton} />
              Income
            </label>
          </div>

          <div className={styles.formFields}>
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="date">Date</label>
              <input
                className={styles.formInput}
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className={styles.formError}>{errors.date}</p>}
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="description">Description</label>
              <input
                className={styles.formInput}
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className={styles.formError}>{errors.description}</p>}
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="amount">Amount</label>
              <input
                className={styles.formInput}
                type="number"
                id="amount"
                value={amount === '' ? '' : amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              />
              {errors.amount && <p className={styles.formError}>{errors.amount}</p>}
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="category">Category</label>
              <select
                className={styles.formSelect}
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {(type === 'Expense' ? expenseCategories : incomeCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            {editIndex !== null ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </div>
      </form>

      <div className={styles.right}>
        <h2>Recent Transactions</h2>
        <ul className={styles.transactionList}>
          {paginatedTransactions.map((transaction, index) => (
            <li
              className={`${styles.transactionItem} ${transaction.type === 'Expense' ? styles.expense : styles.income}`}
              key={index}
            >
              <div className={styles.transactionDetails}>
                <span className={styles.transactionDate}>{transaction.date}</span>
                <span className={styles.transactionDescription}>
                  {transaction.description.length > 50 
                    ? transaction.description.slice(0, 50) + '...' 
                    : transaction.description}
                </span>
                <span className={styles.transactionAmount}>
                  {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>&nbsp;-&nbsp;
                <span className={styles.transactionCategory}>{transaction.category}</span>
                <span className={styles.transactionButtons}>
                  <button onClick={() => handleEdit(startIndex + index)} className={styles.editButton}><i className="fa fa-pencil"> </i></button>
                  <button onClick={() => handleRemove(startIndex + index)} className={styles.removeButton}><i className="fa fa-trash"> </i></button>
                </span>
              </div>
  
            </li>
          ))}
        </ul>
        <div className={styles.pagination}>
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
