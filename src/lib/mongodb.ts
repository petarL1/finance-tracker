import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
let cached = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn; 
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, 
    };    
    cached.promise = (async () => {
      try {
        const mongooseInstance = await mongoose.connect(uri, opts);
        console.log('connected');
        return mongooseInstance;
      } catch (error) {
        console.error('Database connection error:', error);
        throw error; 
      }
    })();
  }
  cached.conn = await cached.promise; 
  return cached.conn; 
}

export { connectToDatabase };
