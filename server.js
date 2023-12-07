const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const mainRouter = require("./routes/index");
const productRouter = require("./routes/products");
const ErrorHandler = require("./errors/ErrorHandler");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.use(mainRouter);

app.use(productRouter);
// app.use('/en',mainRouter);
app.use(express.json());

app.use((req, res, next) => {
  return res.json({
    message: "page not found",
  });
});

app.use((error, req, res, next) => {
  console.log("error ", error.message);
  if (error instanceof ErrorHandler) {
    res.status(error.status).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  } else {
    res.status(500).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }

  // next();
});
app.listen(PORT, () => {
  console.log("server started");
});
