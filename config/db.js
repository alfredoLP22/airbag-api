import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.DB_CONNECTION;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("DB connection was success");
    } catch (error) {
        console.error(`Error: failed to connect to mongoDB ${error}`);
        process.exit(1);
    }
}

export default connectDB;