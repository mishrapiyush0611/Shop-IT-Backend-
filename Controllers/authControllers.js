const User=require('../models/User');
const sendToken = require('../Utils/jwtToken');
const cloudinary=require('cloudinary')
exports.registerUser=(async(req,res,next)=>{
    const result=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    const token=user.getJwtToken();

   sendToken(user,200,res)
})
exports.loginUser=(async(req,res )=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).send("Please Enter Email & password")
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        res.status(401).send("Invalid Email or password")
    }
    console.log(user)
    const isPasswordmatched=await user.comparePassword(password)
    if(!isPasswordmatched){
        res.status(401).send("Invalid Email or password")
    }
    
    sendToken(user,200,res)
})
//get currently logged in user details

exports.getUserProfile=async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
}
//update user profile
exports.updateProfile=async(req,res)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
}

exports.logoutUser=async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"looged Out"
    })
}
exports.allUsers=async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
}

exports.getUserDetails=async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).send("No User found by this id")
    }
    res.status(200).json({
        success:true,
        user
    })
}
exports.updateUser=async(req,res)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
}
exports.deleteUserDetails=async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).send("No User found by this id")
    }
    await user.remove();
    //remove avatar from cloudinary=TODO
    res.status(200).json({
        success:true,
        user
    })
}