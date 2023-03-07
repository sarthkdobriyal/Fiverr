import mongoose from 'mongoose'

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    sellerId:{
        type: String,
        required: true,
    },
    buyerId:{
        type: String,
        required: true,

    },
    readBySeller:{
        type: Boolean,
        required: true,
    },
    readByBuyer:{
        type: Boolean,
        required: true,
    },
    lastMessage:{
        type: String,
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

export default mongoose.model('conversation',ConversationSchema);