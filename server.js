const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./src/controller/error");
const router = require("./src/routes");
const AppError = require("./src/core/AppError");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.all("*", (req, res, next) => {
  const err = new AppError("Not exists route", 404);
  next(err);
});

app.use(errorHandler);

mongoose
  .connect(
    `mongodb://localhost:${process.env.DB_PORT_DEV}/${process.env.DB_NAME_DEV}`
  )
  .then(console.log("Connect db success"))
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.SERVER_PORT_DEV, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT_DEV}`);
});
