import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import createError from '../utils/createError.js'



export const deleteUser = async(req,res, next) => {
    try{
        
        const user = await User.findById(req.params.id);
        if(req.userId !==  user._id){
            return next(createError(403,"You can only delete your account"))
        }
        const data = await User.findByIdandDelete(req.params.id);
        return res.send({
            message:success,
            data:data});

    }catch(err){
        return next(createError(500, err.message));
    }
}

export const getUser = async (req, res, next) => {
    
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).send("Not Found")
        
        return res.status(200).send(user)
    }catch(err){
        next(err);
    }
}