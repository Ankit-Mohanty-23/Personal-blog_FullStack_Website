import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export async function login(req, res) {
    try{
        const {username, password} = req.body;        //take input
        if(!username || !password){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a username and password.',           
            });
        }
        const user = await User.findOne({username}).select('+password')     // checking/Comparing
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                status: 'fail',
                msg: 'Invalid credentials',
            });
        }
        const payload = { id: user._id};

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            status: 'success',
            token,
        });
    }catch(error){
        console.error('LOGIN ERROR: ', error);
        res.status(500).json({
            status: 'error',
            msg: 'An internal server error occurred.',
        });
    }
};