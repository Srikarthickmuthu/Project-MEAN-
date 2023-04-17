const db = require("../models");
const User = db.user;
const decode = require("jwt-decode");
const encode = require("jwt-encode");
exports.addUser = (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    number: req.body.number,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    country: req.body.country,
  });
  user
    .save(user)
    .then((data) => {
      res.send(data);
      console.log("Data added to databse");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};
exports.getUser = (req, res) => {
  User.find()
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
exports.validateUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.find().then((data) => {
    const user = data.filter((user) => {
      user.email == email && decode(user.password) == password;
    });
    if (user) {
      res.send({
        token: encode(req.body.email, "Secret"),
      });
    } else {
      res.send({
        message: "user not found",
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "User was not found!",
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User",
      });
    });
};
