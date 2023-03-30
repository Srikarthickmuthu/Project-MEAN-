const db = require("../models");
const Product = db.products;

exports.addProduct = (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productType: req.body.productType,
    productImage: req.body.productImage,
    show: req.body.show,
  });
  product
    .save(product)
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

exports.getProduct = (req, res) => {
  // res.send(product)
  Product.find().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.getSingleProduct = (req, res) => {
  const id = req.params.id;
  Product.findById(id).then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    }).catch((err) => {
        res.status(500).send({ message: "Error retrieving Product with id=" + id });
    });
};

exports.editProduct = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  
  Product.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};
