'use client';

import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import TransactionForm from '../../components/TransactionForm';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Fix for jwtDecode import
import axios from 'axios';

interface Transaction {
  _id: string; // Ensure this is the MongoDB-generated ID
  userId: string; // The ID of the user associated with the transaction
  date: string; // Format: YYYY-MM-DD or similar
  description: string;
  amount: number;
  category: string;
  type: 'Expense' | 'Income';
}

interface UserSession {
  userId: string;
  username: string;
}

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  // Fetch the user from the token
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
    router.push('/login'); // Adjust path if necessary
  };

  useEffect(() => {
    fetchUser(); // Fetch the user when the component mounts

    return () => {
      // Cleanup when the component unmounts
      setUser(null);
      setTransactions([]);
      setBalance(0);
    };
  }, []);

  useEffect(() => {
    const fetchUserById = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/users/${user.userId}`); // Using string userId from JWT
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUserById(); // Call the function to fetch user data
  }, [user]);
  
  useEffect(() => {
    let isMounted = true; // Add a mounted flag
    const fetchTransactions = async () => {
      if (!user) return; // Prevents fetching transactions if user is null
      setLoading(true);
      setError(null); // Reset error state
  
      try {
        const response = await axios.get(`/api/users/${user.userId}/transactions`);
  
        if (response.status === 200 && isMounted) {
          const fetchedTransactions = Array.isArray(response.data.transactions) ? response.data.transactions : [];
          setTransactions(fetchedTransactions); // Update state if component is still mounted
          calculateBalance(fetchedTransactions); // Calculate balance with fetched transactions
        } else {
          console.error('Unexpected response status:', response.status);
          if (isMounted) {
            setError('Failed to fetch transactions');
          }
        }
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data); // Log error response data
        } else {
          console.error('Failed to fetch transactions:', error); // Log other errors
        }
        if (isMounted) {
          setError('Failed to fetch transactions. Please try again later.');
          setTransactions([]); // Reset transactions in case of error
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTransactions(); // Fetch transactions only if user is set

    return () => {
      isMounted = false; // Cleanup function to set mounted flag to false
    };
  }, [user]);

  const calculateBalance = (transactions: Transaction[] = []) => {
    const initialBalance = transactions.reduce((total, transaction) => {
      return total + (transaction.type === 'Income' ? transaction.amount : -transaction.amount);
    }, 0);
    setBalance(initialBalance);
  };

  const saveTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    if (!user) return; // Prevents saving if user is null
    try {
      const transactionWithUserId = { ...transaction, userId: user.userId }; // Add userId to the transaction
      const response = await axios.post(`/api/users/${user.userId}/transactions`, transactionWithUserId);
      handleAddTransaction(response.data);
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    calculateBalance([...transactions, transaction]);
  };

  const handleRemoveTransaction = async (index: number) => {
    const transactionToRemove = transactions[index];
    try {
      await axios.delete(`/api/transactions/${transactionToRemove._id}`);
      handleRemoveTransactionLocal(index);
    } catch (error) {
      console.error('Failed to remove transaction:', error);
    }
  };

  const handleEditTransaction = async (index: number, updatedTransaction: Transaction) => {
    const oldTransaction = transactions[index];
    try {
      const response = await axios.put(`/api/transactions/${oldTransaction._id}`, updatedTransaction);
      handleEditTransactionLocal(index, response.data);
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleRemoveTransactionLocal = (index: number) => {
    setTransactions((prevTransactions) => {
      const newTransactions = prevTransactions.filter((_, i) => i !== index);
      calculateBalance(newTransactions);
      return newTransactions;
    });
  };

  const handleEditTransactionLocal = (index: number, updatedTransaction: Transaction) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions];
      updatedTransactions[index] = updatedTransaction;
      calculateBalance(updatedTransactions);
      return updatedTransactions;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Finance Tracker</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
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
                onAddTransaction={saveTransaction}
                onRemoveTransaction={handleRemoveTransaction}
                onEditTransaction={handleEditTransaction}
              />
              <div className={styles.transactionList}>
                {transactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  transactions.map((transaction, index) => (
                    <div key={transaction._id} className={styles.transactionItem}>
                      <p>{transaction.date}: {transaction.description} - ${transaction.amount} ({transaction.type})</p>
                      <button onClick={() => handleRemoveTransaction(index)}>Remove</button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
