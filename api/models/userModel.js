import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: false,
    },
    phone:{
        type: Number,
        required: false,
    },
    desc:{
        type: String,
        required: false,
    },
    country:{
        type: String,
        required: false,
    },
    isSeller:{
        type: Boolean,
        default: false,
        required: false,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
    },

})  

export default mongoose.model('user',userSchema);