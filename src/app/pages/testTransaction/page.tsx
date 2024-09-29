'use client'
// /pages/testTransactions.tsx
import React, { useEffect, useState } from 'react';

const TestTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      console.log('Fetched transactions:', data); // Log the response data
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Test Transactions</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
};

export default TestTransactions;
