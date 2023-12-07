const router = require("express").Router();
const apiKeyMiddleWare = require("../middlewares/apiKey");

// router.use(apiKeyMiddleWare);

router.get("/", (req, res) => {
  res.render("index", {
    title: "my home page",
  });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "about page" });
});

router.get("/download", (req, res) => {
  res.download(path.resolve(__dirname) + "/about.html");
});

/** can pass multiple using array */
// router.get("/api/products", (req, res) => {
//   res.json([
//     {
//       id: "123",
//       name: "Chrome",
//     },
//     {
//       id: "124",
//       name: "new Chrome",
//     },
//   ]);
// });

module.exports = router;
