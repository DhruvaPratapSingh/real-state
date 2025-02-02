import express from "express"
import { shouldbeAdmin, shouldbeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from './../middleware/verifyToken.js';
const router=express.Router();
router.get("/should-be-logged-in",verifyToken,shouldbeLoggedIn)
router.get("/should-be-admin",shouldbeAdmin)
export default router;