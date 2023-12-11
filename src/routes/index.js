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

router.get("/contact", (req, res) => {
  res.render("contact", { title: "contact page" });
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "profile page" });
});

// router.post("/contact", (req, res) => {
//   // res.render("contact", { title: "contact page" });
//   console.log(req.body);
//   res.json({
//     message: req.body,
//   });
// });

router.get("/download", (req, res) => {
  res.download(path.resolve(__dirname) + "/about.html");
});

router.get("/service", (req, res) => {
  res.render("service", {
    title: "service page",
    marks: [
      40, 60, 43, 65, 12
    ]
  });
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
