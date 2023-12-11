function apiKey(req, res, next) {
  const API_KEY = "123456";
  console.log(req.query);
  const userAPIkey = req.query.api_key;
  if (userAPIkey && userAPIkey === API_KEY) {
    next();
  } else {
    res.json({
      message: "not allow",
    });
  }
}

module.exports = apiKey;
