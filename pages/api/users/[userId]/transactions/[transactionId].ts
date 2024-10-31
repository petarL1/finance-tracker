import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Transaction from '../../../../../src/models/Transaction';
import { connectToDatabase } from '../../../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, transactionId } = req.query;
  await connectToDatabase();  
  if (!userId || Array.isArray(userId) || !mongoose.Types.ObjectId.isValid(userId as string)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  if (!transactionId || Array.isArray(transactionId) || !mongoose.Types.ObjectId.isValid(transactionId as string)) {
    return res.status(400).json({ message: 'Invalid transaction ID' });}
  const userObjectId = new mongoose.Types.ObjectId(userId as string);
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId as string);

  switch (req.method) {
    case 'DELETE':
      try {
        const result = await Transaction.deleteOne({ _id: transactionObjectId, userId: userObjectId });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Transaction not found' });
        }
        return res.status(200).json({ message: 'Transaction deleted successfully' });
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    case 'PUT':
      try {
        const { amount, description, date, type, category } = req.body;      
        if (typeof amount !== 'number' || !description || typeof type !== 'string' || typeof category !== 'string') {
          return res.status(400).json({ message: 'Invalid data format' });
        }
        const updatedTransaction = await Transaction.findOneAndUpdate(
          { _id: transactionObjectId, userId: userObjectId }, 
          { amount, description, type, category, date },
          { new: true, runValidators: true } 
        );       
        if (!updatedTransaction) {
          return res.status(404).json({ message: 'Transaction not found or does not belong to this user' });
        }       
        return res.status(200).json(updatedTransaction);
      } catch (error) {
        console.error('Failed to update transaction:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}