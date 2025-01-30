import express from "express"
import 'dotenv/config'
import postRouter from "./routes/post.route.js" 
import authRouter from "./routes/auth.route.js"
const app=express();
app.use(express.json());
app.use("/api/v1/post",postRouter);
app.use("/api/auth/",authRouter);
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`connection is successfully run at port ${port}`)
})