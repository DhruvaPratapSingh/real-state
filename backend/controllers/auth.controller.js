import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma.js";
const registerUser=async()=>{
    const {username,email,password}=req.body;
    const hashedpassword= await bcrypt.hash(password,10);
    const newUser=await prisma.user.create({
    name:username,
    email,
    password:hashedpassword,
    avatar
    })
    console.log(newUser);
}
const loginUser=()=>{
    console.log("login User");
}
const logoutUser=()=>{
    console.log("logout User");
}
export {
    registerUser,
    loginUser,
    logoutUser
}