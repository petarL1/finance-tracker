import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'MKD'],
    required: true,
    default: 'USD',
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

export interface Transaction {
  _id?: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  currency: 'USD' | 'EUR' | 'MKD';
}

export default models.Transaction || model('Transaction', transactionSchema);
