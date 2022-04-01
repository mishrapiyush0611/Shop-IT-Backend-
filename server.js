const app= require('./app')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')
dotenv.config();
connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port:${process.env.PORT}`)
}) 


