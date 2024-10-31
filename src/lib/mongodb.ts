import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
let cached = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;}

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,};

    cached.promise = mongoose.connect(uri, opts)
      .then((mongoose) => {
        console.log('connected');
        return mongoose;
      })
      .catch((error) => {
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export { connectToDatabase };
