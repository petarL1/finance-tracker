// /pages/api/transactions/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../src/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const db = await connectToDatabase();

  if (req.method === 'PUT') {
    const { description, amount, type } = req.body;

    const result = await db.collection('transactions').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { description, amount, type } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Transaction updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update transaction' });
    }
  } else if (req.method === 'DELETE') {
    const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id as string) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete transaction' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
