const express=require("express")

const authentication=require("../Middleware/authentication")

const app=express.Router()

const PostModel=require("../Model/PostModel")

app.use(authentication)

app.get("/",async(req,res)=>{
    const userId=req.body.userId
    try{
       const post=await PostModel.find({"userId":userId})
       res.send(post)
    }
    catch(err){
        res.send({msg:"post is not getting",err:err.message})
    }
})

app.post("/create",async(req,res)=>{
 try{
    const newpost=new PostModel(req.body)
    await newpost.save()
    res.send("post is created")
 }catch(err){
    res.send({msg:"post is not created",err:err.message})
 }
})


app.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const postuserId=post.userId
    const reqId=req.body.userId
    try{
        if(reqId!==postuserId){
            res.send("you are not authorised")
            }
        else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("post is updated")
        }

    }
    catch(err){
        res.send(err)
    }
})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const postuserId=post.userId
    const reqId=req.body.userId
    try{
        if(reqId!==postuserId){
            res.send("you are not authorised")
            }
        else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("post is deleted")
        }

    }
    catch(err){
        res.send(err)
    }
})

module.exports=app
