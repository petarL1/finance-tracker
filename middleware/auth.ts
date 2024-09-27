import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';

export const authenticateToken = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Cookies:', req.cookies); // Log cookies here

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Cast user to a specific type if you have one
    req.user = { userId: (user as any).userId, username: (user as any).username };

    // Instead of calling next(), you should return the response here
    // For example, you can call the intended handler or just return success
    res.status(200).json({ message: 'Authenticated successfully', user: req.user });
  });
};
