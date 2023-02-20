const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    try{
        jwt.verify(token, 'login', (err, decoded)=> {
            if(decoded){
              const userId=decoded.userId
               req.body.userId=userId
               next()
            }
            else{
                res.send({msg:"You are not authorized",err:err.message})
            } 
          });
    }
    catch(err){
        res.send({msg:"You are not authorized",err:err.message})
    }
    
}

module.exports=authentication