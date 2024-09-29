// import { NextApiRequest, NextApiResponse } from 'next';
// import Transaction from '../../../src/models/Transaction';
// import { connectToDatabase } from '../../../src/lib/mongodb';

// // Define types for the request body
// interface CreateTransactionRequest {
//   userId: string;
//   amount: number;
//   description: string;
//   category: string;
//   type: 'expense' | 'income';
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Connect to the database
//   const db = await connectToDatabase();
//   const { method } = req;

//   switch (method) {
//     case 'GET':
//       try {
//         const { userId } = req.query; // Expect userId as a query parameter
//         if (Array.isArray(userId)) return res.status(400).json({ error: 'Invalid userId' });
//         const transactions = await Transaction.find({ userId }); // Fetch transactions for the specific user
//         res.status(200).json(transactions);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//         res.status(500).json({ error: 'Error fetching transactions' });
//       }
//       break;

//     case 'POST':
//       const { userId, amount, description, category, type }: CreateTransactionRequest = req.body;

//       // Validate input here if necessary
//       if (!userId || !amount || !description || !category || !type) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }

//       const newTransaction = new Transaction({
//         userId,
//         amount,
//         description,
//         category,
//         type,
//       });

//       try {
//         const savedTransaction = await newTransaction.save();
//         res.status(201).json(savedTransaction); // Respond with the created transaction
//       } catch (error) {
//         console.error('Error saving transaction:', error);
//         res.status(500).json({ error: 'Error saving transaction' });
//       }
//       break;

//     case 'PUT':
//       const { id } = req.query; // Expect id as a query parameter
//       const updatedData = req.body;

//       try {
//         const updatedTransaction = await Transaction.findByIdAndUpdate(id, updatedData, { new: true });
//         if (!updatedTransaction) {
//           return res.status(404).json({ error: 'Transaction not found' });
//         }
//         res.status(200).json(updatedTransaction); // Respond with the updated transaction
//       } catch (error) {
//         console.error('Error updating transaction:', error);
//         res.status(500).json({ error: 'Error updating transaction' });
//       }
//       break;

//     case 'DELETE':
//       const { id: deleteId } = req.query; // Expect id as a query parameter

//       try {
//         const deletedTransaction = await Transaction.findByIdAndDelete(deleteId);
//         if (!deletedTransaction) {
//           return res.status(404).json({ error: 'Transaction not found' });
//         }
//         res.status(204).end(); // Respond with No Content status
//       } catch (error) {
//         console.error('Error deleting transaction:', error);
//         res.status(500).json({ error: 'Error deleting transaction' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
