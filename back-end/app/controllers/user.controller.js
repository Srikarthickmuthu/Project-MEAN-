const db = require("../models");
const User = db.user;
const jwt= require("jsonwebtoken")
const bcrypt=require("bcryptjs")
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
  const emailValue = req.body.email;
  const passwordValue =req.body.password;
  User.findOne({email:emailValue , password:passwordValue}).then((user)=>{
    // const passwordsMatch = comparePasswords(passwordValue, user.password);
    // console.log(passwordsMatch)
    // if (!passwordsMatch) {
    //   res.status(401).json({ message: 'Invalid email or password' });
    //   return;
    // }
    const token = jwt.sign(user.email,"secret")
    res.json(token);
  }).catch((err)=>{
    return res.status(401).json({
      message:" Invalid username and password "
  })
  })
}
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
