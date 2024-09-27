'use client';

import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import TransactionForm from '../../components/TransactionForm';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { jwtDecode } from 'jwt-decode'; // Keeping your import style

interface Transaction {
  date: string;
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
  const router = useRouter(); // Initialize useRouter
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<UserSession | null>(null);

  // Decode the token from localStorage and set the user
  const fetchUser = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode<UserSession>(token); // Decode the token
        console.log('Decoded token:', decodedToken);
        setUser(decodedToken); // Set the user with the decoded data
      } catch (error) {
        console.error('Token decoding failed:', error); // Handle decoding errors
        setUser(null);
      }
    } else {
      setUser(null); // Reset user if no token found
    }
  };

  useEffect(() => {
    fetchUser(); // Run fetchUser when the component mounts
  }, []); // Run only once on mount

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    setBalance((prevBalance) =>
      prevBalance + (transaction.type === 'Income' ? transaction.amount : -transaction.amount)
    );
  };

  const handleRemoveTransaction = (index: number) => {
    const transactionToRemove = transactions[index];
    setTransactions((prevTransactions) => prevTransactions.filter((_, i) => i !== index));
    setBalance((prevBalance) =>
      prevBalance + (transactionToRemove.type === 'Income' ? -transactionToRemove.amount : transactionToRemove.amount)
    );
  };

  const handleEditTransaction = (index: number, updatedTransaction: Transaction) => {
    const oldTransaction = transactions[index];
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = updatedTransaction;

    setTransactions(updatedTransactions);

    const balanceAdjustment =
      (updatedTransaction.type === 'Income' ? updatedTransaction.amount : -updatedTransaction.amount) -
      (oldTransaction.type === 'Income' ? oldTransaction.amount : -oldTransaction.amount);

    setBalance((prevBalance) => prevBalance + balanceAdjustment);
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    setUser(null); // Clear user state
    router.push('/pages/login'); // Redirect to login page (adjust path if necessary)
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Finance Tracker</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div className={styles.dashboard}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Balance</h2>
          <p className={styles.cardBalance}>${balance.toFixed(2)}</p>
          <TransactionForm
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onRemoveTransaction={handleRemoveTransaction}
            onEditTransaction={handleEditTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
