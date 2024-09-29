import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../src/models/User';
import { connectToDatabase } from '../../../src/lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // This is the MongoDB `_id`
  await connectToDatabase();
  const userIdString = Array.isArray(userId) ? userId[0] : userId; // Ensure it's a string

  // Validate if userIdString is not undefined or empty
  if (!userIdString || !mongoose.Types.ObjectId.isValid(userIdString)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  if (req.method === 'GET') {
    try {
      const user = await User.findById(userIdString).lean(); // Use `findById` instead of `findOne`

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
