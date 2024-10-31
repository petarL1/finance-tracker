import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcryptjs';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export const verifyUser = async (username: string | undefined) => {
  if (!username) {
    return null;
  }
  try {
    await client.connect();
    const database = client.db('Cluster0'); 
    const usersCollection = database.collection('users');
    const user = await usersCollection.findOne({ username });
    return user; 
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  } finally {
    await client.close();
  }
};
export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);}
