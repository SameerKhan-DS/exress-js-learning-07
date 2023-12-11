const Person = require("../models/person.model");

function productController(req, res) {
  res.render("products", {
    title: "Products Page",
  });
}

async function postProductController(req, res) {
  const { name, price } = req.body;
  console.log(req.body, "name, price");

  if (!name || !price) {
    next(ErrorHandler.validationError());
  }
  const newPerson = new Person({
    name,
    price,
  });
  // Save the person document to MongoDB
  const savedPerson = await newPerson.save();

  res.status(201).json(savedPerson);
}

async function productGetController(req, res) {
  //   res.json(product);
  try {
    // Fetch all person documents from MongoDB
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    console.error("Error fetching people:", error);
    res.status(500).send("Internal Server Error");
  }
}

function userController(req, res) {
  res.send(`
  <form method="POST">
  <div><input name="username"/></div>
  <div><button type="submit">add user</button></div>
  </form>
  `);
}

function contactController(req, res) {
  res.json({
    status: req.body,
  });
}

async function deleteProductController(req, res) {
  const productId = req.params.productId;

  const deletedProduct = await Person.findOneAndDelete({ _id: productId });

  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
}
module.exports = {
  productController,
  postProductController,
  productGetController,
  userController,
  contactController,
  deleteProductController,
};
