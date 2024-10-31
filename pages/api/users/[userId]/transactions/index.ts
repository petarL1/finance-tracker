import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Transaction from '../../../../../src/models/Transaction';
import { connectToDatabase } from '../../../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      
      if (!userId || Array.isArray(userId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }      
      const userObjectId = new mongoose.Types.ObjectId(userId as string);      
      const transactions = await Transaction.find({ userId: userObjectId }).lean();
      return res.status(200).json({ transactions });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }}
