const db = require("../models");
const Category = db.category;

exports.addCategory = (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName,
    categoryImage: req.body.categoryImage,
  });
  category
    .save(category)
    .then((data) => {
      res.send(data);
      console.log("data added to databse");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.getCategory = (req, res) => {
  Category.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};
