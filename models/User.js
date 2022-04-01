const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Please Enter a valid Email Address']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Your Password must be longer than 6 charachters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            
        },
        url:{
            type:String,
            
        }
    },
    role:{
        type:String,
        default:'user',
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})

userSchema.methods.comparePassword= async function(enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password)
} 
//Encryptin Password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      next();  
    }
    this.password=await bcrypt.hash(this.password,10)
})


userSchema.methods.getJwtToken=function(){
    
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
module.exports=mongoose.model('User',userSchema);