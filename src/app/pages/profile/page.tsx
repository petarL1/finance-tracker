'use client';
import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { format, parseISO, isThisYear } from 'date-fns';
import CategoryChart from './components/CategoryChart';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import CurrencySwitcher from './components/CurrencySwitcher';
import { Transaction } from '../../../models/Transaction';
import Pagination from './components/Pagination';
import BalanceChart from './components/BalanceChart';
import TransactionForm from './components/TransactionForm';
import ProfileDropdown from './components/ProfileDropdown';

interface UserSession {
  userId: string;
  email: string;
}

export interface BalanceDataPoint {
  date: string; 
  amount: number; 
  type: 'income' | 'expense'; 
  currency: 'USD' | 'EUR' | 'MKD'; 
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
  const maxPageButtons = 5;
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [balanceData, setBalanceData] = useState<BalanceDataPoint[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'MKD'>('USD');
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

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
    if (user) {
      logout();
      setUser(null);
      router.push('/pages/login');
    }
  };
  
  useEffect(() => {
    paginateTransactions(transactions); 
  }, [transactions, currentPage]); 

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
    setSelectedCurrency(newCurrency); 
    localStorage.setItem('selectedCurrency', newCurrency); 
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`/api/users/${user.userId}/transactions`);
        const allTransactions = response.data.transactions || [];
  
        setTransactions(allTransactions.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
        
        paginateTransactions(allTransactions);
        calculateBalance(allTransactions); 
      } catch (error) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [user]);

  const convertCurrency = (amount: number | undefined, fromCurrency: 'USD' | 'EUR' | 'MKD', toCurrency: 'USD' | 'EUR' | 'MKD') => {
    if (!amount || typeof amount !== 'number' || isNaN(amount)) {
      console.error('Invalid amount for currency conversion:', amount);
      return 0; 
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
    const convertedAmount = transaction.amount; 
    cumulativeBalance += transaction.type === 'income' ? convertedAmount : -convertedAmount;

    return {
      date: formatTransactionDate(transaction.date),
      amount: convertedAmount, 
      type: transaction.type,
      currency: transaction.currency,
      balance: cumulativeBalance, 
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
      calculateBalance(transactions, selectedCurrency); 
      generateBalanceData(transactions); 
    }
  }, [transactions, selectedCurrency]);
    
const handleAddTransaction = async (transaction: Omit<Transaction, "_id">) => {
  try {
      const response = await axios.post(`/api/users/${user?.userId}/add`, {
          ...transaction,
      });

      const newTransaction = response.data;
      if (!newTransaction || !newTransaction.amount || !newTransaction.category || !newTransaction.type) {
          throw new Error('Invalid transaction received from the server.');
      }      
      setTransactions((prevTransactions) => {
          const updatedTransactions = [newTransaction, ...prevTransactions];
          calculateBalance(updatedTransactions, selectedCurrency); 
          paginateTransactions(updatedTransactions); 
          return updatedTransactions;
      });
  } catch (err) {
      console.error(err);
      setError('Failed to add transaction.');
  }
};  

const handleUpdateTransaction = async (transaction: Transaction) => {
  try {
    let amountToSave = transaction.amount; 
    const originalTransaction = transactions.find(t => t._id === transaction._id);

    if (!originalTransaction) {
      throw new Error('Original transaction not found.');
    }

    if (transaction.currency !== originalTransaction.currency) {
        amountToSave = convertCurrency(
        transaction.amount, 
        transaction.currency, 
        originalTransaction.currency 
      );     
      amountToSave = convertCurrency(
        amountToSave,
        originalTransaction.currency,
        'USD' 
      );
    }
    const response = await axios.put(`/api/users/${user?.userId}/transactions/${transaction._id}`, {
      ...transaction,
      amount: amountToSave, 
    });

    const updatedTransaction = response.data;

    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.map((t) =>
        t._id === updatedTransaction._id ? updatedTransaction : t
      );
      calculateBalance(updatedTransactions, selectedCurrency);
      paginateTransactions(updatedTransactions); 
      return updatedTransactions;
    });

    setEditingTransaction(null); 
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
        paginateTransactions(updatedTransactions); 
        return updatedTransactions;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction.');
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {  
    const convertedAmount = convertCurrency(transaction.amount, transaction.currency, selectedCurrency);    
    setEditingTransaction({
      ...transaction,
      amount: convertedAmount,   
      currency: selectedCurrency, 
    });
  };
  
  useEffect(() => {
    if (transactions.length > 0) {
      calculateBalance(transactions, selectedCurrency); 
      setBalanceData(generateBalanceData(transactions)); 
    }
  }, [transactions, selectedCurrency]);

  return (
    <>
    <div className={styles.pageContainer}>
      <ProfileDropdown/>
      </div>
    <div className={styles.trackerContainer}> 
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
                userId={user ? user.userId : ''}
                onAddTransaction={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                onUpdateBalance={() => calculateBalance(transactions, selectedCurrency)}
                initialTransaction={editingTransaction || undefined}
                selectedCurrency={selectedCurrency} 
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
                        {transaction._id && (<FaTrash className={styles.deleteIcon} onClick={() => handleDeleteTransaction(transaction._id as string)} />)}
                      </div>
                    </div>
                  ))}
               {paginatedTransactions.length === 0 && (
        <div className={styles.placeholder}>
          <p>You will see your recent transactions here.</p>
        </div>
      )}
    </div>
    {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}</>
  )}
      </div>
        {transactions.length > 0 && (
      <div className={styles.charts}>
        <h2 className={styles.chartsHeading}>View your progress over time!</h2>
      <BalanceChart data={balanceData} selectedCurrency={selectedCurrency} exchangeRates={exchangeRates} />
      <CategoryChart data={transactions} selectedCurrency={selectedCurrency} currencyRates={exchangeRates} />
      </div>
        )}
      </div>
      </div>
      </>
  );
}
  export default Profile;