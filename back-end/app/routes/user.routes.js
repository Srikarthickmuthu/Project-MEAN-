module.exports = app => {
    const userPath = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // router.post("/", userPath.addUser);
  
    router.get("/", userPath.getUser);
  
    // router.get("/:id", productPath.getSingleProduct);

    // router.put("/:id", productPath.editProduct);
  
    // router.delete("/:id", productPath.deleteProduct);
  
    app.use('/api/user', router);
  };