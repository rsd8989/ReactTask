const express=require('express');
const mongoose=require('mongoose')
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"})

app.use(cors())
app.use(express.json())
const userController=require('./controllers/UserController')
app.post('/',userController.register)
app.get('/users',userController.getUsers);

mongoose.connect(process.env.DATABASE_URL,
{
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true 
}).then(res=>{
console.log('connected to mongodb')
})

app.listen(process.env.PORT,()=>{ 
    console.log("server running")
})