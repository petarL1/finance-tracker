// src/pages/api/transactions/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '../../../src/models/Transaction'; // Adjust the path if needed
import { connectToDatabase } from '../../../src/lib/mongodb'; // Ensure you import your DB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Extract the ID from the request query

  await connectToDatabase(); // Ensure the database is connected

  if (req.method === 'GET') {
    try {
      // Fetch the transaction by ID
      const transaction = await Transaction.findById(id).lean(); // Use lean for better performance

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Return the fetched transaction as JSON
      return res.status(200).json(transaction);
    } catch (error) {
      console.error('Failed to fetch transaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
