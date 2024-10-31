
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let db: any;

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey'; 
async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('users'); 
  }
  return db;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });}
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      
      const token = jwt.sign(
        { userId: user._id, username: user.username }, 
        SECRET_KEY, 
        { expiresIn: '24h' } 
      );

      return res.status(200).json({ message: 'Login successful', token });
    } else {
      
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }}