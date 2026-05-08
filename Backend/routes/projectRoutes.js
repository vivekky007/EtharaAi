const router = require("express").Router();

const auth = require("../middleware/auth");

const role = require("../middleware/role");

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

// ✅ ADMIN only
router.post(
  "/",
  auth,
  role("ADMIN"),
  createProject
);

// ✅ Logged in users
router.get(
  "/",
  auth,
  getProjects
);

// ✅ ADMIN only
router.post(
  "/:id/add-member",
  auth,
  role("ADMIN"),
  addMember
);

module.exports = router;
