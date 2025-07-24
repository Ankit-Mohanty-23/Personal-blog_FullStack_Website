import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGO_URL;

const connectdb = async () => {
    try{
        const conn = await mongoose.connect(URL);
        console.log(`Mongodb is connected to ${conn.connection.name}`)
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectdb;