import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoute from './routes/user.route.js'
import gigRoute from './routes/gig.route.js'
import conversationRoute from './routes/conversation.route.js'
import messageRoute from './routes/message.route.js'
import reviewRoute from './routes/review.route.js'
import orderRoute from './routes/order.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
dotenv.config();

const connect = () => {
    const db_link  = process.env.MONGO;
    mongoose.connect(db_link)
    .then((db) => {
        console.log('db connected')
    })
    .catch((err) => {
        console.log(err.message , "db error");
    })
}

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser())


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/gig", gigRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);

app.use((err , req,res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Internal Server Error";


    return res.status(errStatus).send(errMessage);
}) 


app.listen(8800, () => {
    connect();
    console.log("Backend server is running")
})