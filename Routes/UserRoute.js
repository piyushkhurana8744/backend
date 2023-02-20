const express=require("express")

const app=express.Router()

const UserModel=require("../Model/UserModel")



const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

app.use(express.json())



app.get("/",(req,res)=>{
    res.send("userpage")
})

app.post("/register",async(req,res)=>{
    
    try{
        const {name,email,gender,password,age,city}=req.body
        bcrypt.hash(password, saltRounds,async(err, hash) =>{
            if(err){
                res.send({msg:"user is created",err:err.message})
            }
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send("user is created")
            }
        });
        res.send(name,email,gender)
       
    }
    catch(err){
        res.send({msg:"user is not created",err:err.message})
    }
    
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        console.log(email,password)
        const user=await UserModel.find({email})
        bcrypt.compare(password, user[0].password,(err, result) =>{
           if(result){
            const token = jwt.sign({ userId: user[0].id }, 'login');
            res.send({msg:"user login successfull",token:token})
           }
        });
       
    }
    catch(err){
        res.send({msg:"user is not logged in",err:err.message})
    }
})



module.exports=app