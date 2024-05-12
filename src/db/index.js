import mongoose from "mongoose";
import { DB_NAME } from "../constanct.js";


export const connectDB = async () => {
try {
        const db = process.env.MONGODB_URL.replace('<PASSWORD>',process.env.DATABASE_PASSWORD).replace('<DBNAME>', DB_NAME)
        const connectionInstance = await mongoose.connect(db);

        console.log(` \n MongoDB Connected at ${connectionInstance.connection.host} 🚀🚀`)
} catch (error) {
    console.log('MongoDB Connection Error::', error.message)
    process.exit(1);
}}
