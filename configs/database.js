import { MONGO_URI } from "./dotenv.js";
import mongoose from "mongoose";

async function CONNECT_TO_MONGODB(url = MONGO_URI) {
  try {
    await mongoose.connect(url);
    console.log(`Connected To MongoDB.`);
  } catch (err) {
    console.error("Error Connecting To MongoDB. ERR:", err);
    process.exit(1);
  }
}

export default CONNECT_TO_MONGODB;
