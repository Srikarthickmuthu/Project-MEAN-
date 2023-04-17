module.exports = app => {
    const categoryPath = require("../controllers/category.controller.js");

    var router = require("express").Router();
  
    router.post("/", categoryPath.addCategory);
  
    router.get("/", categoryPath.getCategory);

    // router.put("/:id", categoryPath.editcategory);
  
    // router.delete("/:id", categoryPath.deletecategory);
  
    app.use('/category', router);
  };