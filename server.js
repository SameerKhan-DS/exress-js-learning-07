const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const mainRouter = require("./src/routes/index");
const productRouter = require("./src/routes/products");
const ErrorHandler = require("./src/errors/ErrorHandler");
const session = require('express-session');
var bodyParser = require("body-parser");
const confiq = require('./confiq/confiq');
const dotenv = require('dotenv');
const connectDB = require("./src/db");

dotenv.config({
  path: './.env'
})

app.use(
  session({
    secret: 'your-secret-key', // Change this to a random string (used to sign the session ID cookie)
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.locals = confiq;
app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

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


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})