import jwt from 'jsonwebtoken';
import User from './models/userModel';

export async function login(req, res) {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({
                status: 'fail',
                msg: 'Please provide proper credentials'
            })
        }

        const user = await User.findOne({ username }).select('+password');
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({
                status: 'fail',
                msg: 'Please provide proper credentials'
            })
        }

        const payload = { id: user._id};

        const 

    }
}