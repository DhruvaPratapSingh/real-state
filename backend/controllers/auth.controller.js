import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma.js";
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
    //   console.log("User created:", newUser);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    } 
}
const loginUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if((!username && !email)) return res.status(400).json("username or email is required");
        if(!password) return res.status(400).json("password is required");
        const existedUser= await prisma.user.findFirst({
            where:{
                OR: [{ email }, { username }],
            }
        })
        if(!existedUser) return res.status(400).json("user not registered");
        const comparePassword=await bcrypt.compare(password,existedUser.password);
        if(!comparePassword) return res.status(400).json("password does't match");
        res.status(201).json("user login successfully");
        
    } catch (error) {
        return res.status(500).json("failed to login",error);
    }
}
const logoutUser=()=>{
    
}
export {
    registerUser,
    loginUser,
    logoutUser
}