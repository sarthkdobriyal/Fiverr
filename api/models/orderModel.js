import mongoose from 'mongoose'

const { Schema } = mongoose;

const OrderSchema = new Schema({
    gigId:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    
    desc:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    img:{
        type: String,
        required: false,
    },
    sellerId:{
        type: String,
        required: true,
    },
    buyerId:{
        type: String,
        required: true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    payment_intent:{
        type:String,
        required: true,
    }
    

})  

export default mongoose.model('order',OrderSchema);