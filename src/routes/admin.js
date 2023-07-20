const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Получаем токен из кук
  const token = req.cookies.accesstoken;

  // Проверяем, есть ли токен
  if (!token) {
    return res.sendFile(path.join(__dirname, "../html/denied.html"));
  }

  try {
    // Проверяем токен
    const decoded = jwt.verify(token, "secret");

    // Добавляем декодированные данные в объект запроса для использования в следующих обработчиках
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

router.get("/", verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/admin.html"));
});

module.exports = router;