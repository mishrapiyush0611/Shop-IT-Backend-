const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')
const bodyparser=require('body-parser')
const fileUpload=require('express-fileupload')
const cors=require('cors')
app.use(express.json())
app.use(cookieParser()); 
app.use(bodyparser.urlencoded({extended:true}) )
app.use(fileUpload())
app.use(cors());
//Setting up cloudinary


    const auth=require('./Routes/auth')
    const products=require('./routes/product')
    const order=require('./routes/order')
    app.use('/api/v1',products)
    app.use('/api/v1',auth)
    app.use('/api/v1',order)
module.exports=app;