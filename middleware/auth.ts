import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';

// Extend NextApiRequest to include user
interface AuthenticatedRequest extends NextApiRequest {
  user?: { userId: string; username: string };
}

export const authenticateToken = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
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

    // Call next() to pass control to the next middleware or route handler
    next();
  });
};
