import mongoose from 'mongoose'

const { Schema } = mongoose;

const GigSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shortTitle: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    images:{
        type: [String],
        required: false,
    },
    totalRating:{
        type: Number,
        
        default:0
    },
    starRating:{
        type: Number,
        
        default:0
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
    coverImg:{
        type: String,
        required: false,
    },
    deliveryTime:{
        type: Number,
        required: true,
    },
    revisionNumber:{
        type: String,
        required: true,
    },
    features:{
        type: [String],
        required: false,
    },
    sales:{
        type:Number,
        default: 0,
    }
    

})  

export default mongoose.model('gig',GigSchema);