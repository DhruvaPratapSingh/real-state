import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
const router=express.Router();
router.get("/register",registerUser);
router.post("/login",loginUser)
router.route("/logout").post(logoutUser)
export default router;