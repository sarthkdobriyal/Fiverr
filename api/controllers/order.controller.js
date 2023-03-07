import Order from "../models/orderModel.js";
import Gig from "../models/gigModel.js";
import createError from "../utils/createError.js";
import Stripe from "stripe";



export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  try{

    
    const gig = await Gig.findById(req.params.id);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (gig.price * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  
  
  const newOrder = Order({
    gigId: gig._id,
    title: gig.title,
    img: gig.coverImg,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    category: gig.category,
    desc: gig.desc,
    payment_intent: paymentIntent.id,
  });
  
  
  const data = await newOrder.save();
  
  return res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}catch(err){
  next(err);
}
};


export const confirm = async (req,res,next) => {
  try{
    const data = await Order.findOneAndUpdate({
      payment_intent: req.body.payment_intent,
    }, {
      $set:{
        isCompleted: true,
      }
    })

    return res.status(200).send("Order has been confirmed.")
  }catch(err){
    next(err)
  }
}