import { Schema, model, models } from 'mongoose';

const expenseSchema = new Schema({
  userId: { type: String, required: true }, // Reference to the user
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Optional: Default to current date
  category: { type: String, required: true }, // Category of the transaction
  type: { 
    type: String, 
    enum: ['expense', 'income'], // Allowable values
    required: true 
  },
});

export default models.Expense || model('Expense', expenseSchema);
