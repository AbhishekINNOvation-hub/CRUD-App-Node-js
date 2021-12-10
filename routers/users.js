const express =require('express')
const router=express.Router();
const schema=require('../model/schema')
const validation=require('../validation')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config('./env')
router.get('/signup',async(req,res)=>{
try{
const User=await schema.find()
res.json(User);
}
catch(error){
    res.send(error)
}
})
router.get('/:id',async(req,res)=>{
    try{
    const User1=await schema.findById(req.params.id)
    res.json(User1);
    }
    catch(error){
        res.send(error)
    }
    })
    
router.post('/signup',async(req,res)=>{
    const emailExist= await schema.findOne({email:req.body.email});
    if(emailExist) return res.send('email already exist');
    var salt= await bcrypt.genSalt();
        const hasedpassword= await bcrypt.hashSync(req.body.password.toString(),salt);
        //console.log('salt',salt);
    const User= new schema({
        name:req.body.name,
        email:req.body.email,
        password:hasedpassword
        
    })
    const token=jwt.sign({email:User.email},process.env.Secret)
    res.setHeader('token',token)
    return res.send(token)
    //console.log(token)
    const userVer= await jwt.verify(token,process.env.Secret)
    console.log(userVer)
    //return res.send(userVer)
    
    // const validpass= await bcrypt.compare(req.body.password,User.password)
    // if(!validpass){
    //     return res.send('user is not registered');
    // }
    try{
        const a1= await User.save()
        res.json(a1);
    }catch(error){
        res.send(error);
    }
})
    router.patch('/:id',async(req,res)=>{
        try{
            const User= await schema.findById(req.params.id)
            // User.sub=req.body.sub
            Object.assign(User, req.body);
           
            const a1= await User.save()
        
            res.json(a1)
        }
        catch(error){
            res.send(error)
        }
})
router.delete('/:id',async(req,res)=>{
    try{
        const del= await schema.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.send('Id is wrong');
        }
        res.send(del); 
    }
    catch(error)
    {
        res.send(error)
    }
    
})
module.exports=router;