import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_URL=process.env.DB_URL

mongoose.connect(DB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: false
  })
  .then(() => console.log("connection is successfully...."))
  .catch((err) => console.log(`No connection mongodb ${err}`));