const express = require("express");
const router = express.Router();
const path = require("path");
const { User } = require('../repos/user.repo')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res) => {
  await User.deleteMany({ username: { $ne: "admin" } });
  res.redirect("/admin");
});

module.exports = router;

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.accesstoken;
//   if (!token) {
//     return res.sendFile(path.join(__dirname, "../html/denied.html"));
//   }
//   try {
//     const decoded = jwt.verify(token, "secret");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Недействительный токен" });
//   }
// };

// router.get("/", verifyToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "../html/admin.html"));
// });
