import { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '../../../src/models/Transaction'; 
import { connectToDatabase } from '../../../src/lib/mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; 
  await connectToDatabase(); 
  if (req.method === 'GET') {
    try {
      const transaction = await Transaction.findById(id).lean(); 
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
            return res.status(200).json(transaction);
    } catch (error) {
      console.error('Failed to fetch transaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }}