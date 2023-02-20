const express=require("express")

const app=express()

const cors=require("cors")

const connection=require("./db")

const userRouter=require("./Routes/UserRoute")

const postRouter=require("./Routes/PostRoute")

app.use(cors())

app.use(express.json())

app.use("/user",userRouter)

app.use("/post",postRouter)

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.listen(8080,async()=>{
    await connection
    console.log("server is running")
})