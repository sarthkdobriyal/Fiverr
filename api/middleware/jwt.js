import createError from '../utils/createError.js'
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.accessToken;
        
    if(!token) return next(createError(401,"You're not logggd in"))

    jwt.verify(token,process.env.JWT_TOKEN, (err,payload) => {
        if(err) return next(createError(401,"You're not logggd in"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next();
    }
    );
}