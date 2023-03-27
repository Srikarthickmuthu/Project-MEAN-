module.exports = app => {
    const cartPath = require("../controllers/cart.controller.js");

    var router = require("express").Router();
  
    router.post("/", cartPath.addProduct);
  
    router.get("/", cartPath.getCart);
  
    router.get("/:id", cartPath.getSingleCart);

    router.put("/:id", cartPath.updateDelivery);
  
    router.delete("/:id", cartPath.deleteCart);
  
    app.use('/api/cart', router);
  };