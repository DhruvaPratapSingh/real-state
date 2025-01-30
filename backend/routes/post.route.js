import express from "express"
const router=express.Router();
router.get("/post",(req,res)=>{
    res.send("router")
    console.log("post route working!")
})
export default router;