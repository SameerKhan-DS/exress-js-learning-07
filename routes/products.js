const router = require("express").Router();
const ErrorHandler = require("../errors/ErrorHandler");
let product = require("../productData");
const multer = require("multer");

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products Page",
  });
});

router.get("/api/products", (req, res) => {
  res.json(product);
});

router.post("/api/products", (req, res, next) => {
  const { name, price } = req.body;
  console.log(name, price);
  if (!name || !price) {
    // return res.status(422).json({ error: "all filed are required" });

    // throw new Error("All filed are require");
    next(ErrorHandler.validationError());
  }
  const newProduct = {
    name: name,
    price: price,
    id: new Date().getTime().toString(),
  };
  product.push(newProduct);

  res.json(newProduct);
});

router.get("/user/add", (req, res) => {
  res.send(`
  <form method="POST">
  <div><input name="username"/></div>
  <div><button type="submit">add user</button></div>
  </form>
  `);
});

router.get("/user/add", (req, res) => {
  res.json({
    data: req.body,
  });
});

router.post("/contact", (req, res, next) => {
  console.log(req.body);
  res.json({
    status: req.body,
  });
});

/**#NODE upload single file*/

// router.post("/profile", upload.single("avatar"), function (req, res, next) {
//   console.log(req.file, req.body, "req.file");
//   res.json({
//     message: "file uploaded",
//   });
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });

/** Upload multiple file */

// router.post("/profile", upload.array("avatar", 12), function (req, res, next) {
//   res.json({
//     message: "photos uploaded"
//   })
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// });

/********** function to filter files */
var fileFilter = function (req, file, cb) {
  // Accept only PNG files
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG files are allowed!"), false);
  }
};

const upload = multer({ dest: "uploads/", fileFilter });
/** Multi file from multiple inputs tag */

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);

router.post("/profile", cpUpload, function (req, res, next) {
  console.log(req.files, "req.files");
  res.json({
    message: "photos uploaded",
  });
  // req.files is an object (String -> Array) where fileName is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});
router.delete("/api/products/:productId", (req, res) => {
  product = product.filter((item) => req.params.productId !== item.id);
  res.json({
    status: "OKAY",
  });
});
module.exports = router;
