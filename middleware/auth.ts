import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';
interface AuthenticatedRequest extends NextApiRequest {
  user?: { userId: string; username: string };
}
export const authenticateToken = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }    
    req.user = { userId: (user as any).userId, username: (user as any).username };    
    next();
  });
};
