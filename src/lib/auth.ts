// src/lib/auth.ts
import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcryptjs';

const uri = process.env.MONGODB_URI as string; // Make sure to set your MongoDB URI
const client = new MongoClient(uri);

export const verifyUser = async (username: string | undefined) => {
  if (!username) {
    return null; // Return null if username is not provided
  }

  try {
    await client.connect();
    const database = client.db('Cluster0'); // Replace with your database name
    const usersCollection = database.collection('users'); // Replace with your collection name

    // Find the user by username
    const user = await usersCollection.findOne({ username });

    return user; // Return the user object if found
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  } finally {
    await client.close(); // Ensure the client connection is closed after the operation
  }
};

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
