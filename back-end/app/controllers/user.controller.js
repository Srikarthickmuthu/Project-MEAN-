const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.addUser = (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    number: req.body.number,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
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
          err.message || "Some error occurred while creating the users.",
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
          err.message || "Some error occurred while retrieving users.",
      });
    });
};
exports.validateUser = (req, res) => {

  if(req.body.email==="admin@aspire.com" && req.body.password==="Admin@123"){
    var token = jwt.sign(
      {
        email: req.body.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).send({
      message: "Login successfull",
      role:"Admin",
      token: token,
    });
  }
  else{
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign(
        {
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        message: "Login successfull",
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
  }
};
exports.deleteUser = (req, res) => {
  const id = req.params.id;

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
    .catch(() => {
      res.status(500).send({
        message: "Could not delete User",
      });
    });
};
