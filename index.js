import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const prefix = process.env.PREFIX ||'api';
const version = process.env.VERSION || 'v1';
const port = process.env.PORT || 3001;

connectDB();
app.use(cors());
app.use(express.json());
app.use(`/${prefix}/${version}/auth`, userRouter)
app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
