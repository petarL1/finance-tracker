import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../src/lib/mongodb';
import Transaction from '../../../../src/models/Transaction';
import mongoose from 'mongoose'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; 

  await connectToDatabase(); 
  if (req.method === 'POST') {
    try {
      const { amount, description, date, category, type, currency } = req.body;       
      if (!amount || !description || !date || !category || !type || !currency) {
        return res.status(400).json({ message: 'All fields are required' });
      }      
      if (!userId || (Array.isArray(userId) && !userId[0])) {
        return res.status(400).json({ message: 'userId is required' });
      }
      const validUserId = Array.isArray(userId) ? userId[0] : userId;
      if (!mongoose.Types.ObjectId.isValid(validUserId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }     
      const newTransaction = new Transaction({
        userId: new mongoose.Types.ObjectId(validUserId), 
        amount,
        description,
        date,
        category,
        type,
        currency, 
      });      
      const savedTransaction = await newTransaction.save();
      return res.status(201).json(savedTransaction); 
    } catch (error) {
      console.error('Failed to add transaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']); 
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
