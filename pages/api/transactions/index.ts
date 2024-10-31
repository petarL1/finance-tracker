import { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '../../../src/models/Transaction'; 
import { connectToDatabase } from '../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase(); 
  if (req.method === 'GET') {
    try {
      const transactions = await Transaction.find({}).lean();       
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }}