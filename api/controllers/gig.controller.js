import Gig from "../models/gigModel.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
    if(!req.isSeller )
        return next(createError(403, "Only sellers are allowed to create gigs."))
        
        
        const newGig = new Gig({
            ...req.body,
        });
        try {
        const doc = await newGig.save()
         return res.status(200).send("Gig created successfully")
  } catch (err) {
    next(err);
  }
};

export const updateGig = async (req,res,next) => {
    try{
        res.send("update")
    }catch(err){
        next(err)
    }
}
export const deleteGig = async (req,res,next) => {
    try{
        const gig = await Gig.findById(req.params.id);
        if(!gig) return res.status(404).sed("Not Found");
        if(gig.userId !== req.userId ) return res.status(404).send("You're not authorized");
        const doc = await Gig.findByIdAndDelete(req.params.id)
        return res.status(200).send(doc);
    }catch(err){
        next(err)
    }
}
export const getGigs = async (req,res,next) => {

    const q = req.query
    // console.log(q);
    const filter = {
        ...(q.userId && {userId: q.userId}),
        ...(q.category && {category: q.category}),
        ...((q.min || q.max) && {
            price : {...(q.min && {$gt : q.min}), ...(q.max && {$lt:q.max})}
        } ),
        ...(q.search && {title: {$regex: q.search,$options:"i"}}),

        
    }
    try{
        const gigs = await Gig.find(filter).sort({[q.sort == 'sales' ? "starRating" : "createdAt"]:-1});
        if(!gigs) return res.status(404).send("Not Found");
        res.send(gigs);
    }catch(err){
        next(err)
    }
}
export const getGig = async (req,res,next) => {


    try{
        const gig = await Gig.findById(req.params.id);
        if(!gig) return res.status(404).send("Not Found");
        res.send(gig);
    }catch(err){
        next(err)
    }
}