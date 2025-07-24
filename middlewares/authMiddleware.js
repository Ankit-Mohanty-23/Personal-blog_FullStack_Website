import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';

async function protect(req, res, next){
    try{
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')    // extrating token from header
        ){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){                                             
            return res.status(401).json({
                status: 'fail',
                msg: 'You are not logged in. Please log in to get access.',
            });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);     //verifying inputs with databse
        const currentUser = await User.findById(decoded.id);
        if(!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists.',
            });
        }
        req.user = currentUser;
        next();
    }catch(error){
        console.log('AUTH MIDDLEWARE ERROR: ',error);
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token or session expired. Please log in again.',
        });
    }
};

export default protect;