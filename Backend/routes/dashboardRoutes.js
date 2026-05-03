const router = require("express").Router();
const auth = require("../middleware/auth");
const { getDashboard } = require("../Backend/controllers/dashboardController");

router.get("/", auth, getDashboard);

module.exports = router;