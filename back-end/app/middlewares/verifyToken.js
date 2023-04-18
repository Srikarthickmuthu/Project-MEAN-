// const jwt = require("jsonwebtoken")

// const User= require("../models/user.model");

// function verifyToken(req,res){
//    const email=req.body.email;
//    const password=req.body.password;

//     User.findOne({email , password},(err,user)=>{
//         if(err || !user){
//             return res.status(401).json({
//                 message:"Invalid username and password"
//             })
//         }
//         const token =jwt.sign({email :user.email},"Secret",{expiresIn:'1h'})

//         res.json({token})
//     })
// }
// module.exports=verifyToken()
