// routes/authRoutes.js
const router = require("express").Router();
const { signup, login } = require("../Backend/controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;