import createError from "../utils/createError.js";
import Review from "../models/reviewModel.js";
import Gig from "../models/gigModel.js";


export const createReview = async (req, res, next) => {
    if(req.isSeller) return next(createError(403, "Sellers cannot create a review"))
    
    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        starNumber: req.body.starNumber,
    })
    
    try{

        const review = await Review.findOne({
            userId: req.userId,
            gigId: req.body.gigId,
        })
        if(review) return next(createError(403,"You have already reviewed this gig"))
        const data = await newReview.save();
        await Gig.findByIdAndUpdate(req.body.gigId, {$inc: {totalRating: req.body.star, starRating: 1}})

        return res.status(200).send(data);

    }catch(err){
        next(err)
    }
}
export const getReviews =async  (req, res, next) => {
    try{

        const reviews = await Review.find({gigId: req.params.id});
        return res.status(200).send(reviews)

    }catch(err){
        next(err)
    }
}
export const deleteReview = async (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}