const db = require("../models");
const User = db.user;
// exports.addUser = (req, res) => {
//   const user = new User({
//     fname: req.body.fname,
//     lname: req.body.lname,
//     number: req.body.number,
//     email: req.body.email,
//     password: req.body.password,
//     gender: req.body.gender,
//     country: req.body.country
//   });
//   user
//     .save(user)
//     .then((data) => {
//       res.send(data);
//       console.log("data added to databse");
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Product.",
//       });
//     });
// };
exports.getUser = (req, res) => {
    const productName = req.query.productName;
    var condition = productName
      ? { productName: { $regex: new RegExp(productName), $options: "i" } }
      : {};
  
    Product.find(condition)
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