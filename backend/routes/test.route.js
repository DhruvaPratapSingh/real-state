import express from "express"
import { shouldbeAdmin, shouldbeLoggedIn } from "../controllers/test.controller.js";
const router=express.Router();
router.get("/should-be-logged-in",shouldbeLoggedIn)
router.get("/should-be-admin",shouldbeAdmin)
export default router;