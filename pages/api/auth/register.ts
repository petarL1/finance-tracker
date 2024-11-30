import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let db: any;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('users'); 
  }
  return db;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
      const db = await connectToDatabase();
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: hashedPassword,
      };
      const result = await db.collection('users').insertOne(newUser);
      res.status(201).json({ message: 'User registered successfully.', userId: result.insertedId });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
