import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection
const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  console.error("❌ MONGO_URI is not defined. Check your .env file!");
  process.exit(1); // Stop server if URI is missing
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error ❌", err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
