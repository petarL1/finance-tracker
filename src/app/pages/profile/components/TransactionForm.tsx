import React, { useState, useEffect } from 'react';
import styles from './css/TransactionForm.module.css';

interface Transaction {
  _id?: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  currency: 'USD' | 'EUR' | 'MKD';
}

interface TransactionFormProps {
  userId: string;
  onAddTransaction: (transaction: Omit<Transaction, '_id'>) => Promise<void>;
  onUpdateBalance: (amount: number) => void;
  initialTransaction?: Transaction;
  selectedCurrency: 'USD' | 'EUR' | 'MKD'; 
  currencyRates: { [key in 'USD' | 'EUR' | 'MKD']: number }; 
}

const convertAmount = (
  amount: number,
  fromCurrency: 'USD' | 'EUR' | 'MKD',
  toCurrency: 'USD' | 'EUR' | 'MKD',
  rates: { [key in 'USD' | 'EUR' | 'MKD']: number } 
): number => {
  if (fromCurrency === toCurrency) return amount;
  return (amount / rates[fromCurrency]) * rates[toCurrency];
};

const expenseCategories = ['Food', 'Utilities', 'Entertainment', 'Healthcare'];
const incomeCategories = ['Salary', 'Freelancing', 'Investments', 'Gifts'];

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  onUpdateBalance,
  initialTransaction,
  selectedCurrency, 
  currencyRates, 
}) => {
  
  const [date, setDate] = useState<string>(initialTransaction?.date || '');
  const [description, setDescription] = useState<string>(initialTransaction?.description || '');
  const [amount, setAmount] = useState<number | ''>(initialTransaction?.amount || '');
  const [category, setCategory] = useState<string>(
    initialTransaction?.category || expenseCategories[0]
  );
  const [type, setType] = useState<'expense' | 'income'>(
    initialTransaction?.type || 'expense'
  );
  const [error, setError] = useState<string>('');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'MKD'>(
    initialTransaction?.currency || selectedCurrency 
  );

  const currencySymbols: { [key in 'USD' | 'EUR' | 'MKD']: string } = {
    USD: '$',
    EUR: '€',
    MKD: 'ден.',
  };

  useEffect(() => {
    if (initialTransaction) {
      setDate(new Date(initialTransaction.date).toISOString().split('T')[0]);
      setDescription(initialTransaction.description);
      setCategory(initialTransaction.category);
      setType(initialTransaction.type);
      setCurrency(initialTransaction.currency); 

      const convertedAmount = convertAmount(
        initialTransaction.amount,
        initialTransaction.currency, 
        selectedCurrency,
        currencyRates
      );
      setAmount(Number(convertedAmount.toFixed(2))); 
    } else {
      resetForm();
    }
  }, [initialTransaction, selectedCurrency, currencyRates]);

  const handleTypeChange = (newType: 'expense' | 'income') => {
    setType(newType);
    setCategory(newType === 'expense' ? expenseCategories[0] : incomeCategories[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!date || !description || amount === '' || +amount < 0) {
      setError('Please fill out all fields with valid inputs.');
      return;
    }

    if (description.length > 50) {
      setError('Description cannot exceed 50 characters.');
      return;
    }
    const transaction = {
      _id: initialTransaction ? initialTransaction._id : '',
      date,
      description,
      amount: Number(amount),  
      category,
      type,
      currency,  
    };

    try {
      await onAddTransaction(transaction);      
      const balanceChange = type === 'income' ? Number(amount) : -Number(amount);
      onUpdateBalance(balanceChange);
      resetForm();
    } catch (err) {
      setError('Failed to add transaction.');
    }
  };
  const resetForm = () => {
    setDate('');
    setDescription('');
    setAmount('');
    setCategory(type === 'expense' ? expenseCategories[0] : incomeCategories[0]);
    setCurrency(selectedCurrency); 
    setError('');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
  
        <div className={styles.formFields}>
          <div className={`${styles.formField} ${styles.transactionTypeContainer}`}>
            <label
              htmlFor="expense"
              className={`${styles.transactionTypeLabel} ${type === 'expense' ? styles.active : ''}`}
            >
              <input
                id="expense"
                name="transactionType"
                type="radio"
                className={styles.hiddenRadio}
                checked={type === 'expense'}
                onChange={() => handleTypeChange('expense')}
              />
              <div className={styles.expenseButton}></div>
              Expense
            </label>
            <label
              htmlFor="income"
              className={`${styles.transactionTypeLabel} ${type === 'income' ? styles.active : ''}`}
            >
              <input
                id="income"
                name="transactionType"
                type="radio"
                className={styles.hiddenRadio}
                checked={type === 'income'}
                onChange={() => handleTypeChange('income')}
              />
              <div className={styles.incomeButton}></div>
              Income
            </label>
          </div>
  
          <div className={styles.formField}>
            <label htmlFor="date" className={styles.formLabel}>Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
  
          <div className={styles.formField}>
            <label htmlFor="description" className={styles.formLabel}>Description</label>
            <input
              id="description"
              type="text"
              name="description"
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
            <label htmlFor="amount" className={styles.formLabel}>
              Amount
            </label>
            <div className={styles.amountInputWrapper}>
              <input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className={styles.formInput}
                required
                min={0}
                max={100000000}
                step="0.01"
                placeholder={`${currencySymbols[currency]}`}
                onKeyDown={(e) => e.key === 'e' && e.preventDefault()} 
              />
            </div>
          </div>
  
          <div className={styles.formField}>
            <label htmlFor="category" className={styles.formLabel}>Category</label>
            <select
              id="category"
              name="category"
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
              {initialTransaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}  
export default TransactionForm;
