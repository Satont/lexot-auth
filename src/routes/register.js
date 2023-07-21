const express = require("express");
const router = express.Router();
const path = require("path");
const { User } = require('../repos/user.repo')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/register.html"));
});

router.get("/warning", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/warning.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
  }).exec();
  if (user === null) {
    User.create({ username: username, password: password });
    res.redirect("/login");
  } else {
    res.redirect("/register/warning");
  }
});

module.exports = router;
