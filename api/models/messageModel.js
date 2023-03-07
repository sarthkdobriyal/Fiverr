import mongoose from 'mongoose'

const { Schema } = mongoose;

const MessgaeSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    conversationId:{
        type: String,
        required: true,
    },
    desc:{
        type:String,
        required:true,
    },
    

}, {timestamp:true})  

export default mongoose.model('message',MessgaeSchema);