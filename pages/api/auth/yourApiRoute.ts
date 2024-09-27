import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateToken } from '../../../middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  authenticateToken(req, res, () => {
    res.status(200).json({ message: 'This is protected data.' });
  });
};

export default handler;
