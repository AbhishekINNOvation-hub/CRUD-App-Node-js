const express= require('express');
const app= express();
var mongoose=require('mongoose');
var cors=require('cors');
mongoose.connect('mongodb://localhost:27017/crud').then(()=>{
    console.log("connected to the db");
})
app.use(express.json())
app.listen(8000,()=>{
    console.log('running server');
})
var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const user=require('./routers/users')
app.use('/users',user);
app.use(cors(corsOptions))
