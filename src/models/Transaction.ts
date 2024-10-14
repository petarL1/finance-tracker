import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User's _id
  amount: { type: Number, required: true },
  currency: {  // New field to store the currency type
    type: String,
    enum: ['USD', 'EUR', 'MKD'],
    required: true,
    default: 'USD', // Set default currency, can be changed as needed
  },
  description: { type: String, required: false },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['expense', 'income'], 
    required: true 
  },
});

export default models.Transaction || model('Transaction', transactionSchema);
