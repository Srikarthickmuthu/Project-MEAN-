const express = require("express");

const router = express.Router();

const createError = require("http-errors");

const User = require("../models/user.model");

const authSchema=require("../helpers/validation_schema")

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // if (!email || !password) throw createError.BadRequest();

    // const result =await authSchema.validateAsync(req.body)

    const doesExist = await User.findOne({ email: email });

    if (doesExist) throw createError.Conflict(`${email} is already registered`);

    const user = new User({ email, password });

    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  res.send("Login route");
});

router.post("/refresh", async (req, res, next) => {
  res.send("Refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("Logout route");
});

module.exports = router;
