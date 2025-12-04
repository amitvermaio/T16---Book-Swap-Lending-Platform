import mongoose from "mongoose";
import debug from 'debug';

const dbgr = debug("dev:db");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/bookswap");
    dbgr(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    dbgr(error.message);
  }
}

export default connectDb;