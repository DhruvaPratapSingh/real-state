import  jwt  from 'jsonwebtoken';
const shouldbeLoggedIn = async(req,res)=>{
const token=req.cookies.token;
if(!token){
    return res.status(401).json({msg:"You are not authorized to access this route"})
}
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
    if(err){
        return res.status(401).json({msg:"You are not authorized to access this route"})
    }
    // req.user=decoded;
    // next();
})
 res.status(200).json({msg:"You are authorized to access this route"})
}
const shouldbeAdmin = async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({msg:"You are not authorized to access this route"})
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({msg:"You are not authorized to access this route"})
        }
        if(!payload.isAdmin){
            return res.status(401).json({msg:"You are not authorized to access this route"})
        }
        // req.user=decoded;
        // next();
    })
    res.status(200).json({msg:"You are authorized to access this route"})
}
export {
    shouldbeLoggedIn,
    shouldbeAdmin
}