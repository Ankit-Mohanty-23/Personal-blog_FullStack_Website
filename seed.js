import mongoose from "mongoose";
import dotenv from "dotenv";
import User from './models/userModel.js';

dotenv.config();

const ADMIN_USERNAME = 'postadmin';
const ADMIN_PASSWORD = 'veik0g4gb6';

const seedAdmin = async () => {
    try{
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected successfully.');

        const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });

        if(existingAdmin){
            console.log('Admin user already exists, No action taken');
            return;
        }

        console.log('Admin user not found. Creating a new one...');
        const adminUser = new User({
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
        });
        await adminUser.save();

        console.log('----------------------------------------------------');
        console.log('Admin user created successfully!');
        console.log(`Username: ${ADMIN_USERNAME}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log('You can now use these credentials to log in.');
        console.log('----------------------------------------------------');

    }catch(error){
        console.error('Rrror during admin user seeding: ',error);
    }finally{
        console.log('disconnecting from database...');
        await mongoose.disconnect();
        console.log('Database disconnected.');
    }
};

seedAdmin();

