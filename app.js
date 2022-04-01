const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')
const cors=require('cors')
app.use(express.json())
app.use(cookieParser()); 
app.use(cors());
    const auth=require('./Routes/auth')
    const products=require('./routes/product')
    const order=require('./routes/order')
    app.use('/api/v1',products)
    app.use('/api/v1',auth)
    app.use('/api/v1',order)
module.exports=app;