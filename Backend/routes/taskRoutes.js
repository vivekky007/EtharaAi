const router = require("express").Router();

const auth = require("../middleware/auth");

const role = require("../middleware/role");

const {
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/taskController");

// ✅ Only ADMIN can create tasks
router.post(
  "/",
  auth,
  role("ADMIN"),
  createTask
);

// ✅ Logged in users can see tasks
router.get(
  "/",
  auth,
  getTasks
);

// ✅ Logged in users can update own tasks
router.patch(
  "/:id",
  auth,
  updateTask
);

module.exports = router;
