import express from "express"
import dotenv from "dotenv"
import postRouter from "./routes/post.route.js" 
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import testRoute from "./routes/test.route.js"
import userRouter from "./routes/user.route.js"
const app=express();
dotenv.config({
    path: "./env",
  });
  console.log(process.env.CORS_ORIGIN);
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",postRouter);
app.use("/api/auth",authRouter);
app.use("/api/test",testRoute);
app.use("/api/users",userRouter)
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`connection is successfully run at port ${port}`)
})