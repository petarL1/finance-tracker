// pages/api/users/[userId]/add.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../src/lib/mongodb';
import Transaction from '../../../../src/models/Transaction';
import mongoose from 'mongoose'; // Import mongoose to handle ObjectId

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Get userId from the query

  await connectToDatabase(); // Connect to the database

  if (req.method === 'POST') {
    try {
      const { amount, description, date, category, type, currency } = req.body; // Extract transaction data from the body

      // Validate the required fields (you can customize this as per your requirements)
      if (!amount || !description || !date || !category || !type || !currency) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Ensure userId is defined and valid
      if (!userId || (Array.isArray(userId) && !userId[0])) {
        return res.status(400).json({ message: 'userId is required' });
      }

      const validUserId = Array.isArray(userId) ? userId[0] : userId;

      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(validUserId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      // Create a new transaction
      const newTransaction = new Transaction({
        userId: new mongoose.Types.ObjectId(validUserId), // Convert to ObjectId
        amount,
        description,
        date,
        category,
        type,
        currency, // Add the currency field
      });

      // Save the transaction to the database
      const savedTransaction = await newTransaction.save();

      return res.status(201).json(savedTransaction); // Respond with the saved transaction
    } catch (error) {
      console.error('Failed to add transaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']); // Allow only POST method
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
