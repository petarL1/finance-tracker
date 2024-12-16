import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let db: any;

const SECRET_KEY = process.env.JWT_SECRET as string; 
if (!SECRET_KEY) throw new Error(`JWT_SECRET isn't defined`);
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
    
    if (!email|| !password) {
      return res.status(400).json({ message: 'Email and password are required.' });}
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      
      const token = jwt.sign(
        { userId: user._id, email: user.email }, 
        SECRET_KEY, 
        { expiresIn: '24h' } 
      );

      return res.status(200).json({ message: 'Login successful', token });
    } else {
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }}