const app= require('./app')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')
const cloudinary=require('cloudinary')
dotenv.config();
connectDatabase();

cloudinary.config( {
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port:${process.env.PORT}`)
}) 


