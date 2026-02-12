import mongoose from "mongoose";
import debug from 'debug';

const dbgr = debug("dev:db");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    dbgr(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    dbgr(error.message);
  }
}

export default connectDb;