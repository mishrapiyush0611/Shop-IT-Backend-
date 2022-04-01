const jwt=require('jsonwebtoken')
const User = require('../models/User')

exports.isAuthenticatedUser=async(req,res,next)=>{
     const {token}=req.cookies
     if(!token){
         return res.status(500).send('login first')
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     req.user=await User.findById(decoded.id);
     next()  
}
exports.authorizeRoles=(...roles)=>{
return (req,res,next)=>{
    
    if(!roles.includes(req.user.role)){

        return next(
            res.status(404).send("This role is not allowed to access this")
        )
    }
    next()
}
}