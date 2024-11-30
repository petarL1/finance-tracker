import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../src/models/User';
import { connectToDatabase } from '../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ valid: false });
    }

    try {
      await connectToDatabase();
      const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: new Date() } });

      if (!user) {
        return res.status(400).json({ valid: false });
      }

      return res.status(200).json({ valid: true });
    } catch (error) {
      return res.status(500).json({ valid: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
