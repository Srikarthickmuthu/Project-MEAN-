module.exports = app => {
    const userPath = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", userPath.addUser);
  
    router.get("/", userPath.getUser);

    router.delete("/:id", userPath.deleteUser);
  
    app.use('/api/user', router);
  };