import jwt from 'jsonwebtoken';
export const verifyToken=(req,res,next)=>{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({msg:"You are not authorized to access this route"})
        }
        jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
            if(err){
                return res.status(401).json({msg:"You are not authorized to access this route"})
            }
            req.userId=payload.id;
            next();
        })
        // res.status(200).json({msg:"You are authorized to access this route"})
    }