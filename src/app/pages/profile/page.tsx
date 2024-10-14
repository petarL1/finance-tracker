'use client';

import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import TransactionForm from '../../components/TransactionForm';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { format, parseISO, isThisYear } from 'date-fns';
import BalanceChart from '../../components/BalanceChart';
import CategoryChart from '../../components/CategoryChart';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import CurrencySwitcher from '../../components/CurrencySwitcher';

interface Transaction {
  _id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  currency: 'USD' | 'EUR' | 'MKD';
}

interface UserSession {
  userId: string;
  username: string;
}

export interface BalanceDataPoint {
  date: string; // Date of the transaction
  amount: number; // Amount of the transaction
  type: 'income' | 'expense'; // Type of the transaction
  currency: 'USD' | 'EUR' | 'MKD'; // Currency type
}


const exchangeRates = {
  USD: 1,
  EUR: 0.9,
  MKD: 50,
};

const formatTransactionDate = (dateString: string) => {
  const date = parseISO(dateString);
  return isThisYear(date) ? format(date, 'MMM d') : format(date, 'MMM d, yyyy');
};

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionsPerPage] = useState<number>(5);
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [balanceData, setBalanceData] = useState<BalanceDataPoint[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'MKD'>('USD');

  const fetchUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<UserSession>(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Token decoding failed:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/pages/login');
  };

  useEffect(() => {
    paginateTransactions(transactions); // Call this whenever transactions change
  }, [transactions, currentPage]); // Include currentPage as a dependency  

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency') as 'USD' | 'EUR' | 'MKD' | null;
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);  

  const handleCurrencyChange = (newCurrency: 'USD' | 'EUR' | 'MKD') => {
    setSelectedCurrency(newCurrency); // Update the selected currency
    localStorage.setItem('selectedCurrency', newCurrency); // Store it in local storage
  };


  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`/api/users/${user.userId}/transactions`);
        const allTransactions = response.data.transactions || [];
        console.log('Fetched Transactions:', allTransactions); // Log the fetched transactions
  
        setTransactions(allTransactions.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
        
        paginateTransactions(allTransactions);
        calculateBalance(allTransactions); // Recalculate balance after fetching transactions
      } catch (error) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [user]);

  const convertCurrency = (amount: number, fromCurrency: 'USD' | 'EUR' | 'MKD', toCurrency: 'USD' | 'EUR' | 'MKD') => {
    if (!amount || typeof amount !== 'number' || isNaN(amount)) {
      console.error('Invalid amount for currency conversion:', amount);
      return 0; // Default to 0 if amount is invalid
    }
    const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return parseFloat((amount * conversionRate).toFixed(2));
  };

  const calculateBalance = (transactions: Transaction[] = [], currency = selectedCurrency) => {
    const initialBalance = transactions.reduce((total, transaction) => {
      const convertedAmount = convertCurrency(transaction.amount, transaction.currency, currency);
      return total + (transaction.type === 'income' ? convertedAmount : -convertedAmount);
    }, 0);
  
    setBalance(initialBalance);
  };

const generateBalanceData = (transactions: Transaction[]): BalanceDataPoint[] => {
  let cumulativeBalance = 0;

  return transactions.map((transaction) => {
    const convertedAmount = transaction.amount; // Use the original amount
    cumulativeBalance += transaction.type === 'income' ? convertedAmount : -convertedAmount;

    return {
      date: formatTransactionDate(transaction.date),
      amount: convertedAmount, // Include the original amount
      type: transaction.type,
      currency: transaction.currency,
      balance: cumulativeBalance, // Include cumulative balance
    };
  });
};

  const paginateTransactions = (allTransactions: Transaction[]) => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    setPaginatedTransactions(allTransactions.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (transactions.length > 0) {
      calculateBalance(transactions, selectedCurrency); // Update balance
      generateBalanceData(transactions); // Update chart data
    }
  }, [transactions, selectedCurrency]);
  
  
const handleAddTransaction = async (transaction: Omit<Transaction, "_id">) => {
  try {
      // Use the amount directly without converting
      const response = await axios.post(`/api/users/${user?.userId}/add`, {
          ...transaction,
          // Remove conversion; store amount as it is
      });

      const newTransaction = response.data;

      // Ensure valid response
      if (!newTransaction || !newTransaction.amount || !newTransaction.category || !newTransaction.type) {
          throw new Error('Invalid transaction received from the server.');
      }

      // Add the new transaction to state
      setTransactions((prevTransactions) => {
          const updatedTransactions = [newTransaction, ...prevTransactions];
          calculateBalance(updatedTransactions, selectedCurrency); // Recalculate balance using original amounts
          paginateTransactions(updatedTransactions); // Update pagination after adding
          return updatedTransactions;
      });
  } catch (err) {
      console.error(err);
      setError('Failed to add transaction.');
  }
};

  
const handleUpdateTransaction = async (transaction: Transaction) => {
  try {
    let amountToSave = transaction.amount; // Start with the existing amount
    const originalTransaction = transactions.find(t => t._id === transaction._id);

    if (!originalTransaction) {
      throw new Error('Original transaction not found.');
    }

    // Check if the currency has changed during the edit
    if (transaction.currency !== originalTransaction.currency) {
      // Convert the amount back to the original currency to avoid double conversion
      amountToSave = convertCurrency(
        transaction.amount, 
        transaction.currency, 
        originalTransaction.currency // Convert to original currency first
      );

      // Then convert it to USD if needed
      amountToSave = convertCurrency(
        amountToSave,
        originalTransaction.currency,
        'USD' // Save it as USD in the database
      );
    }

    const response = await axios.put(`/api/users/${user?.userId}/transactions/${transaction._id}`, {
      ...transaction,
      amount: amountToSave, // Save the correct amount in USD
    });

    const updatedTransaction = response.data;

    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.map((t) =>
        t._id === updatedTransaction._id ? updatedTransaction : t
      );
      calculateBalance(updatedTransactions, selectedCurrency);
      paginateTransactions(updatedTransactions); // Update pagination after update
      return updatedTransactions;
    });

    setEditingTransaction(null); // Stop editing mode
  } catch (err) {
    console.error(err);
    setError('Failed to update transaction.');
  }
};

  
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await axios.delete(`/api/users/${user?.userId}/transactions/${transactionId}`);
      
      setTransactions((prevTransactions) => {
        const updatedTransactions = prevTransactions.filter((t) => t._id !== transactionId);
        calculateBalance(updatedTransactions, selectedCurrency);
        paginateTransactions(updatedTransactions); // Update pagination after delete
        return updatedTransactions;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction.');
    }
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    // Assuming you have a function to handle currency conversion
    const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
      if (fromCurrency === toCurrency) return amount; // No conversion needed
      const rateFrom = exchangeRates[fromCurrency];
      const rateTo = exchangeRates[toCurrency];
      return (amount / rateFrom) * rateTo; // Conversion formula
    };
  
    // Convert the transaction amount to the selected currency
    const convertedAmount = convertCurrency(transaction.amount, transaction.currency, selectedCurrency);
  
    // Set the edited transaction with the amount in the current view's currency
    setEditingTransaction({
      ...transaction,
      amount: convertedAmount,   // Update the amount to be in the selected currency
      currency: selectedCurrency, // Set the currency to the selected view currency
    });
  };
  
  useEffect(() => {
    if (transactions.length > 0) {
      calculateBalance(transactions, selectedCurrency); // Update balance with conversion
      setBalanceData(generateBalanceData(transactions)); // Update chart data
    }
  }, [transactions, selectedCurrency]);

  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome, {user?.username}</h2>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
  
      <div className={styles.dashboard}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Balance</h2>
  
          <div className={styles.balanceContainer}>
            <p className={styles.cardBalance}>
              {selectedCurrency} {balance.toFixed(2)}
            </p>
            <div className={styles.currencySwitcher}>
            <CurrencySwitcher 
            selectedCurrency={selectedCurrency}
            onChangeCurrency={handleCurrencyChange}
            />
            </div>
          </div>
  
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
             <TransactionForm
                userId={user?.userId || ''}
                onAddTransaction={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                onUpdateBalance={() => calculateBalance(transactions, selectedCurrency)}
                initialTransaction={editingTransaction || undefined}
                selectedCurrency={selectedCurrency} // Ensure this is passed
                currencyRates={exchangeRates}
              />

              <div className={styles.transactionList}>
              {paginatedTransactions.map((transaction) => (
                    <div key={transaction._id} className={styles.transactionItem}>
                      <div className={styles.transactionDetails}>
                        <p>{formatTransactionDate(transaction.date)}: {transaction.description}</p>
                        <p className={styles.category}>{transaction.category}</p> 
                        <p className={`${styles.amount} ${transaction.type === 'income' ? styles.income : styles.expense}`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {transaction.amount % 1 === 0 ? transaction.amount.toFixed(0) : transaction.amount.toFixed(2)} {transaction.currency}
                          </p>
                      </div>
                      <div className={styles.transactionActions}>
                        <FaEdit className={styles.editIcon} onClick={() => setEditingTransaction(transaction)} />
                        <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteTransaction(transaction._id)} />
                      </div>
                    </div>
                  ))}
                {Array.from({ length: transactionsPerPage - paginatedTransactions.length }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} className={styles.transactionItem}>
                    <div className={styles.transactionDetails}>
                      <p className={styles.placeholder}>&nbsp;</p>
                      <p className={`${styles.amount} ${styles.placeholder}`}>&nbsp;</p>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.activePage : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      <div className={styles.charts}>
        <h2 className={styles.chartsHeading}>View your progress over time!</h2>
      <BalanceChart data={balanceData} selectedCurrency={selectedCurrency} exchangeRates={exchangeRates} />
      <CategoryChart data={transactions} selectedCurrency={selectedCurrency} currencyRates={exchangeRates} />
      </div>
      </div>
      </div>
  );
  
}
  export default Profile;