import express from 'express'
import { createConversation , updateConversation, getConversations, getSingleConversation} from "../controllers/conversation.controller.js"
import {verifyToken} from '../middleware/jwt.js';

const router = express.Router();


router.get("/", verifyToken, getConversations)
router.post("/", verifyToken, createConversation)
router.get("/:id", verifyToken, getSingleConversation)
router.put("/:id", verifyToken, updateConversation)

export default router