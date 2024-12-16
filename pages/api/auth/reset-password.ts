import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../src/models/User';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Missing token or password' });
    }

    try {
      await connectToDatabase();
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: new Date() },
      });
      if (!user) {
        return res.status(400).json({ valid: false, message: 'Invalid or expired token' });
      }

      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword){
        return res.status(400).json({ message: 'New password cannot be the same as the old password'});
      }
      
      const hashedPassword = await bcrypt.hash(password, 12);

      
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();

      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
