const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.products = require("./product.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.cart = require("./cart.model.js")(mongoose);

module.exports = db;