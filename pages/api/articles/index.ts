// src/pages/api/articles/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../src/lib/mongodb';
import Article from '../../../src/models/Article';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  const db = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // Fetch all articles
      const articles = await Article.find({}).lean(); // Use lean for better performance

      // Return the fetched articles as JSON
      return res.status(200).json(articles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
