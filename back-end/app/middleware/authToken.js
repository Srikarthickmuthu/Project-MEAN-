const jwt=require("jsonwebtoken")

require("dotenv").config()

function authenticate(req,res,next){

    const token=req.headers.authorization
    
    jwt.verify(token,process.env.SECRET_KEY,(err,response)=>{
        if(err){
            res.status(401).send("Unauthorized");
        }
        else{
            next(); 
        }
    })
}

module.exports=authenticate;