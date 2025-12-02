import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors'

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Virtual Assistant Backend is running!');
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`));
