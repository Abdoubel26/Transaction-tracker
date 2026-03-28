import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected Successfully At:' + conn.connection.host)
    }
    catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}