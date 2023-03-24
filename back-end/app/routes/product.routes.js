module.exports = app => {
    const productPath = require("../controllers/product.controller.js");

    // const userPath = require("../controllers/user.controller.js");

    var router = require("express").Router();
  
    router.post("/product", productPath.addProduct);
  
    router.get("/product", productPath.getProduct);

    // router.post("/user", userPath.addProduct);
  
    // router.get("/user", userPath.getProduct);
  
    router.get("/product/:id", productPath.getSingleProduct);

    router.put("/product/:id", productPath.editProduct);
  
    router.delete("/product/:id", productPath.deleteProduct);
  
    app.use('/api', router);
  };