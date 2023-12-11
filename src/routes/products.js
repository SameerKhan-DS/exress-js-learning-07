const router = require("express").Router();
const ErrorHandler = require("../errors/ErrorHandler");
let product = require("../../productData");
const multer = require("multer");
const {
  productController,
  postProductController,
  productGetController,
  userController,
  contactController,
  deleteProductController,
} = require("../controller/products.controller");

const {
  userRegistrationController, userRegistrationPostController, userLoginGetController, userLoginPostController
} = require("../controller/user.controller");
/** Router of the site */
router.get("/products", productController);

router.get("/api/products", productGetController);

router.post("/api/products", postProductController);

// router.get("/user/add", userController);

router.post("/contact", contactController);

router.delete("/api/products/:productId", deleteProductController);

router.get("/registration", userRegistrationController);

router.post("/registration", userRegistrationPostController);

router.get("/login", userLoginGetController);

router.post("/login", userLoginPostController);

/** END */

/** Multer implementation */

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
/** END */

module.exports = router;
