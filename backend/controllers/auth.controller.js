import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma.js";
import  jwt  from "jsonwebtoken";
import ms from "ms"
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
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email) return res.status(400).json({ message: "Username or email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const existedUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
    });

    if (!existedUser) return res.status(400).json({ message: "User not registered" });

    const comparePassword = await bcrypt.compare(password, existedUser.password);
    if (!comparePassword) return res.status(400).json({ message: "Password doesn't match" });
    const age = ms(process.env.ACCESS_TOKEN_EXPIRY || "7d");

    const token = jwt.sign(
        { id: existedUser.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_SECRET_EXPIRY }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure:true,
        maxAge: age
    }).status(200).json({ message: "Login successful" });

} catch (error) {
    return res.status(500).json({ message: "Failed to login", error: error.message });
}
};

const logoutUser=(req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout successfully"})
}
export {
    registerUser,
    loginUser,
    logoutUser
}