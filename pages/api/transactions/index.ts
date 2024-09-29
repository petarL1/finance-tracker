// src/pages/api/users/transactions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '../../../src/models/Transaction'; // Ensure this path is correct
import { connectToDatabase } from '../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await connectToDatabase(); 

  if (req.method === 'GET') {
    try {
      // Fetch all transactions
      const transactions = await Transaction.find({}).lean(); // Use lean for better performance

      // Return the fetched transactions as JSON
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
