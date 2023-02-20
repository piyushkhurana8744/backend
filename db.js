const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://piyush:piyush@cluster0.pviemw5.mongodb.net/?retryWrites=true&w=majority")

module.exports=connection