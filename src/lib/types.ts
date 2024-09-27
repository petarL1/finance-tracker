// src/lib/types.ts

// Define your User interface
interface User {
  _id: string;
  username: string; // Assuming you use username instead of email
  password: string; // Adjust based on your schema
}

// Define Expense Type
type TransactionType = 'expense' | 'income'; // Define types for transaction

// Define your Expense interface
interface Expense {
  _id?: string; // MongoDB generates this for us
  userId: string; // Reference to the user
  amount: number; // Amount of the transaction
  description: string; // Description of the transaction
  date?: Date; // Optional date
  category: string; // Category of the expense/income
  type: TransactionType; // Type: 'expense' or 'income'
}

// Adjust if you have a custom type for session
interface Session {
  user?: User;
  expenses?: Expense[]; // Optionally include user expenses
}

// Adjust if you have a custom type for JWT
interface JWT {
  user?: User;
}
