const jwt=require("jsonwebtoken")
function authenticate(req,res,next){

    const token=req.headers.authorization

    console.log(jwt.decode(token))
    
    jwt.verify(token,"Secret",(err,response)=>{
        if(err){
            res.status(401).send("Unauthorized");
        }
        else{
            next();
        }
    })
    
}
module.exports=authenticate;