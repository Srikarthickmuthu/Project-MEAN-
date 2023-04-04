const db = require("../models");
const Cart = db.cart;
exports.addProduct = (req, res) => {
  const cart = new Cart({
    deliveryStatus: req.body.deliveryStatus,
    show: req.body.show,
    quantity: req.body.quantity,
    total: req.body.total,
    userId: req.body.userId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productType: req.body.productType,
    productImage: req.body.productImage,
  });
  cart.save(cart).then((data) => {
      res.send(data);
      console.log("data added to databse");
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.getCart = (req, res) => {
  Cart.find()
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

exports.getSingleCart = (req, res) => {
  const id = req.params.id;

  Cart.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

exports.updateDelivery = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

exports.deleteCart = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndRemove(id)
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
