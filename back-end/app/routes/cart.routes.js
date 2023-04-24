module.exports = app => {
    const cartPath = require("../controllers/cart.controller.js");

    var router = require("express").Router();
  
    const authToken=require("../middleware/authToken.js")

    router.post("/",  authToken ,cartPath.addProduct);
  
    router.get("/", authToken ,cartPath.getCart);

    router.get("/get", cartPath.getCart);
  
    router.get("/:id", cartPath.getSingleCart);

    router.put("/:id", authToken ,cartPath.updateDelivery);
  
    router.delete("/:id", authToken ,cartPath.deleteCart);
  
    app.use('/cart', router);
  };