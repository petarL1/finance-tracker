// src/models/Article.ts
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // Store serialized MDX content as string
  references: { type: [String], default:[] }, // Array of references as strings
});

export default mongoose.models.Article || mongoose.model('Article', articleSchema);
