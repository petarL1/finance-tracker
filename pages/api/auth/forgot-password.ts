import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from '../../../src/lib/sendResetPasswordEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || email.length > 254 || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
      const result = await sendResetPasswordEmail(email);
      if (result.success) {
        return res.status(200).json({ message: 'If this email is registered, a password reset link has been sent.' });
      } else {
        return res.status(500).json({ message: 'An error occurred' });
      }
    } catch (error) {
      console.error(error);  
      return res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
