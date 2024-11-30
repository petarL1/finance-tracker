import { Schema, model, models } from 'mongoose';

export interface User {
  _id: string;
  email: string; 
  password: string;}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  resetToken: { type: String, default: null },
  resetTokenExpiration: { type: Date, default: null },
});

export default models.User || model('User', userSchema);
