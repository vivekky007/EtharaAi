const router = require("express").Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const User = require("../models/User");

router.get(
  "/",
  auth,
  role("ADMIN"),
  async (req, res) => {
    try {
      const users = await User.find(
        {},
        "name email role"
      );

      res.json(users);

    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

module.exports = router;
