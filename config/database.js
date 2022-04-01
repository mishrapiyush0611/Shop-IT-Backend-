const mongoose=require('mongoose')

const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(conn=>{
        console.log("Connected to  MONGO DB")
    }).catch(err=>{
        console.log("error OCCURED WHILE CONNECTING TO DB",err)
    })
}
module.exports=connectDatabase;