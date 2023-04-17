const express = require("express");

const cors = require("cors");

const app = express();

const createError = require("http-errors");

require("./app/config/db.config");

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bigbazar application." });
});

require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/category.routes")(app);
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
