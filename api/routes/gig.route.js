import express from 'express'
import { createGig , deleteGig, updateGig, getGigs, getGig} from "../controllers/gig.controller.js"
import {verifyToken} from '../middleware/jwt.js';
const router = express.Router();


router.post("/create",verifyToken ,createGig)
router.delete("/:id", verifyToken, deleteGig)
router.patch("/:id", verifyToken, updateGig)          
router.get("/gigs", getGigs)
router.get("/:id", getGig);          


export default router