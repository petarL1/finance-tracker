// src/pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let db: any;

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey'; // Set a secret key in .env file
async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('users'); // The name of the MongoDB database
  }
  return db;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      // **Step 1: Generate JWT Token**
      const token = jwt.sign(
        { userId: user._id, username: user.username }, // Payload for the token
        SECRET_KEY, // Secret key
        { expiresIn: '1h' } // Token expiration time
      );

      // Respond with the token
      return res.status(200).json({ message: 'Login successful', token });
    } else {
      // Invalid username or password
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
