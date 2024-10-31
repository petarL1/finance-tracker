import { Schema, model, models } from 'mongoose';

export interface User {
  _id: string;
  username: string; 
  password: string;}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

export default models.User || model('User', userSchema);
