const router = require("express").Router();
const apiKeyMiddleWare = require("../middlewares/apiKey");
// router.use(apiKeyMiddleWare);

const requireAuth = (req, res, next) => {
  // Check if the user is authenticated (using session in this example)
  if (req.session && req.session.user) {
    // User is authenticated, continue to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login'); // Replace '/login' with your actual login page route
  }
};

router.get("/", requireAuth, (req, res) => {
  console.log(requireAuth, 'requireAuth');
  res.render("index", {
    title: "My Home Page",
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

module.exports = router;
