module.exports = app => {
    const userPath = require("../controllers/user.controller.js");

    // const verifyToken =require('../middlewares/authJWT.js')

    var router = require("express").Router();
  
    router.post("/", userPath.addUser);
  
    router.post("/validate", userPath.validateUser)
    
    router.get("/", userPath.getUser);

    router.delete("/:id", userPath.deleteUser);
  
    app.use('/user', router);
  };