import { NextApiRequest, NextApiResponse } from 'next';
import Expense from '../../../src/models/Expense';
import { connectToDatabase } from '../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  const db = await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, amount, description, category, type } = req.body;

    // Validate input here if necessary
    if (!userId || !amount || !description || !category || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newExpense = new Expense({
      userId,
      amount,
      description,
      category,
      type,
    });

    try {
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense); // Respond with the created expense
    } catch (error) {
      console.error('Error saving expense:', error);
      res.status(500).json({ error: 'Error saving expense' });
    }
  } else {
    // Handle other request methods if necessary
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
