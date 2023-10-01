import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createError from '../utils/createError.js'


export const register = async(req,res, next) => {
    try{
        const hash = bcrypt.hashSync(req.body.password, 4)
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        
        const doc = await newUser.save();
        return res.status(201).send("User has been created");
    }
    catch(err){
        next(createError(500, `Error while creating user ${err.message}`))
    }
}

export const login = async(req,res, next) => {

    try{
        const user = await User.findOne({email:req.body.email}) 
        if(!user){
            next(createError(404,"User Not found"));
        }
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400,"Wrong password or username"));
        

        const token = jwt.sign({
            id:user._id,
            isSeller:user.isSeller,

        }, process.env.JWT_TOKEN);



        const { password , ...info} = user._doc;
        res.cookie("accessToken", token, {httpOnly:true}).status(200).send(info)

    }catch(err){
        return next(500,err.message)
    }

}
export const logout = (req, res, next) => {
    try{
        res.clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        }).status(200).send("User has been logged out")
    }
    catch(err){
        return next(500, err)
    }
}