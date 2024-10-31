import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, 
  references: { type: [String], default:[] },});

export interface Article {
  title: string;
  slug: string;
  content: string | null;
  references: string[]; 
}

export default mongoose.models.Article || mongoose.model('Article', articleSchema);
