// routes/taskRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask
} = require("../Backend/controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, updateTask);

module.exports = router;