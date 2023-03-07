import mongoose from 'mongoose'

const { Schema } = mongoose;

const ReviewSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    gigId:{
        type: String,
        required: true,
    },
    starNumber:{
        type: Number,
        min:0,
        max: 5,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
})  

export default mongoose.model('reviews',ReviewSchema);