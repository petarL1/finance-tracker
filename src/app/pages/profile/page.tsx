'use client'

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

interface Transaction {
  _id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
}

interface UserSession {
  userId: string;
  username: string;
}

interface BalanceDataPoint {
  date: string; // Date in YYYY-MM-DD format
  balance: number; // Balance amount for that date
}

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // State for sort order
  const [balanceData, setBalanceData] = useState<BalanceDataPoint[]>([]); // Specify the type here


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
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/users/${user.userId}/transactions`);
        const allTransactions = response.data.transactions || [];

        const sortedTransactions = allTransactions.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(sortedTransactions); // Set sorted transactions
        calculateBalance(sortedTransactions); // Calculate balance based on all fetched transactions
        paginateTransactions(sortedTransactions); // Calculate balance based on all fetched transactions
      } catch (error) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const calculateBalance = (transactions: Transaction[] = []) => {
    const initialBalance = transactions.reduce((total, transaction) => {
      const amount = transaction.amount;
      return total + (transaction.type === 'income' ? amount : -amount);
    }, 0);

    setBalance(initialBalance);
  };

  // Pagination
  const paginateTransactions = (allTransactions: Transaction[]) => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    setPaginatedTransactions(allTransactions.slice(startIndex, endIndex));
  };

  // Sorting function
  const sortTransactions = (transactions: Transaction[], order: 'asc' | 'desc') => {
    return transactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedTransactions = sortTransactions([...transactions], newSortOrder); // Sort transactions in local state
    setTransactions(sortedTransactions); // Update transactions state immediately
    paginateTransactions(sortedTransactions); // Update pagination
  };

  useEffect(() => {
    paginateTransactions(transactions); // Update pagination when transactions change
  }, [currentPage, transactions]);

  const saveTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    if (!user) return;

    try {
      const response = await axios.post(`/api/users/${user.userId}/add`, transaction);
      const newTransaction = response.data;

      // Update transactions state immediately and sort
      const updatedTransactions = [...transactions, newTransaction].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setTransactions(updatedTransactions);
      calculateBalance(updatedTransactions);
      paginateTransactions(updatedTransactions); // Recalculate pagination
      setEditingTransaction(null); // Reset the editing transaction
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    if (!user) return;

    try {
      const response = await axios.put(`/api/users/${user.userId}/transactions/${transaction._id}`, transaction);
      const updatedTransaction = response.data;

      // Update transactions state immediately and sort
      const updatedTransactions = transactions.map(trans => 
        trans._id === updatedTransaction._id ? updatedTransaction : trans
      ).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setTransactions(updatedTransactions);
      calculateBalance(updatedTransactions); // Update balance using the updated transactions
      paginateTransactions(updatedTransactions); // Update pagination after editing
      setEditingTransaction(null); // Reset the editing transaction
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleRemoveTransaction = async (id: string) => {
    try {
      const transactionToRemove = transactions.find(transaction => transaction._id === id);

      if (!transactionToRemove) {
        console.error('Transaction not found in state:', id);
        return;
      }

      await axios.delete(`/api/users/${user?.userId}/transactions/${id}`);

      // Update transactions state immediately and sort
      const updatedTransactions = transactions.filter(transaction => transaction._id !== id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setTransactions(updatedTransactions);

      // Recalculate balance based on the updated transactions
      calculateBalance(updatedTransactions);
      paginateTransactions(updatedTransactions); // Recalculate pagination

    } catch (error) {
      console.error('Failed to remove transaction:', error);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  // Render pagination controls
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className={styles.pagination}>
        {pages.map((page) => (
          <button 
            key={page} 
            onClick={() => setCurrentPage(page)} 
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchBalanceData = async () => {
      if (!user) return;
  
      try {
        const response = await axios.get(`/api/users/${user.userId}/transactions`);
        const allTransactions = response.data.transactions || [];
  
        // Prepare balance data
        const balanceMap: Record<string, number> = {};
        allTransactions.forEach(transaction => {
          const date = new Date(transaction.date).toISOString().split('T')[0]; // Get YYYY-MM-DD
          if (!balanceMap[date]) {
            balanceMap[date] = 0;
          }
          balanceMap[date] += transaction.type === 'income' ? transaction.amount : -transaction.amount;
        });
  
        // Convert the balanceMap to an array and calculate cumulative balance
        const balanceArray = Object.keys(balanceMap).map(date => ({
          date,
          balance: balanceMap[date]
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
        // Calculate running total balance
        let runningBalance = 0;
        const runningBalanceData = balanceArray.map(item => {
          runningBalance += item.balance; // Update running total
          return {
            date: item.date,
            balance: runningBalance // Store cumulative balance
          };
        });
  
        setBalanceData(runningBalanceData); // Update the state with cumulative balance data
      } catch (error) {
        setError('Failed to fetch balance data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBalanceData();
  }, [user]);
  
  
  
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
          <p className={styles.cardBalance}>${balance.toFixed(2)}</p>
          {loading ? (
            <p>Loading transactions...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
              <TransactionForm
                userId={user?.userId || ''}
                onAddTransaction={editingTransaction ? updateTransaction : saveTransaction}
                onUpdateBalance={() => {}}
                initialTransaction={editingTransaction || undefined} // Pass the transaction to edit
              />
              <div className={styles.transactionList}>
                <div className={styles.sortContainer}>
                  <button onClick={handleSortToggle} className={styles.sortButton}>
                    Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
                {paginatedTransactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  <>
                    {paginatedTransactions.map((transaction) => (
                      <div key={transaction._id} className={styles.transactionItem}>
                        <div className={styles.transactionDetails}>
                          <p>
                            {formatTransactionDate(transaction.date)}: {transaction.description}
                            <br />
                            <span className={`${styles.amount} ${transaction.type === 'income' ? styles.income : styles.expense}`}>
                              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                            </span>
                            <span className={styles.category}> - Category: {transaction.category}</span>
                          </p>
                        </div>
                        <div className={styles.buttonGroup}>
                          <button onClick={() => handleEditTransaction(transaction)} className={styles.editButton}></button>
                          <button onClick={() => handleRemoveTransaction(transaction._id)} className={styles.deleteButton}></button>
                        </div>
                      </div>
                    ))}
                    {/* Render placeholders for empty transactions */}
                    {Array.from({ length: 5 - paginatedTransactions.length }).map((_, index) => (
                      <div key={`placeholder-${index}`} className={`${styles.transactionItem} ${styles.placeholder}`} />
                    ))}
                  </>
                )}
              </div>
  
              {renderPagination()}
            </>
          )}
        </div>
      </div>
      <section className={styles.chartsWrapper}><h2 className={styles.chartsTitle}>View your progress over time!</h2>
      <div>
       <BalanceChart data={balanceData}/>
      </div>
      <div>
      <CategoryChart data={transactions}/>
    </div>
    </section>
    </div>
  );
}  

export default Profile;
