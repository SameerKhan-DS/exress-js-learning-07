const router = require("express").Router();
const ErrorHandler = require("../errors/ErrorHandler");
let product = require("../productData");

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



router.delete("/api/products/:productId", (req, res) => {
  product = product.filter((item) => req.params.productId !== item.id);
  res.json({
    status: "OKAY",
  });
});
module.exports = router;
