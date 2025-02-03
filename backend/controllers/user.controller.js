import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
const getUsers = async (req, res) => {
    try {
        const data=await prisma.user.findMany();
        res.status(200).json({ data });
    //    res.status(200).json({ message: "Get all users" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    const id=req.params.id;
    try {
       const user=await prisma.user.findUnique({
           where:{id}
       });
       res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateUser = async (req, res) => {
    const id=req.params.id;
    const tokenId=req.userId;
    if(id!==tokenId){
        return res.status(403).json({message:"You are not allowed to update other user's data"})
    }
    const {password,avatar,...inputs}=req.body;
    let hashedpassword=null;
    try {
        if(password) hashedpassword=await bcrypt.hash(password,10);
        const updatedUser=await prisma.user.update({
            where:{id},
            data:{
               ...inputs,
               ...(hashedpassword && {password:hashedpassword}),
               ...(avatar && {avatar}),
            },
        });
        const {password:userpassword,...rest}=updatedUser;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteUser = async (req, res) => {
    const id=req.params.id;
    const tokenId=req.userId;
    if(id!==tokenId){
        return res.status(403).json({message:"You are not allowed to delete other user's"})
    }

    try {
        await prisma.user.delete({
            where:{id}
        });
        res.status(200).json({ message: "user details deleted" });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export { getUsers, getUser, updateUser, deleteUser };