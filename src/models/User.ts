import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true }, // Username of the user
  password: { type: String, required: true }, // Password for authentication
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }], // Reference to transactions
});

export default models.User || model('User', userSchema);
