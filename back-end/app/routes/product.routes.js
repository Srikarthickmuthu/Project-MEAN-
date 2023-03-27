module.exports = app => {
    const productPath = require("../controllers/product.controller.js");

    var router = require("express").Router();
  
    router.post("/", productPath.addProduct);
  
    router.get("/", productPath.getProduct);
  
    router.get("/:id", productPath.getSingleProduct);

    router.put("/:id", productPath.editProduct);
  
    router.delete("/:id", productPath.deleteProduct);
  
    app.use('/api/product', router);
  };