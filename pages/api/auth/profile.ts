// pages/api/profile.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateToken } from '../../../middleware/auth';

// Extend the NextApiRequest interface to include user information
declare module 'next' {
  interface NextApiRequest {
    user?: { userId: string; username: string }; // Adjust according to your user type
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use the middleware to authenticate the user
  authenticateToken(req, res, () => {
    console.log('Authenticated user:', req.user); 
    return res.status(200).json({ message: `Hello, ${req.user?.username || 'user'}!` });
  });
}
