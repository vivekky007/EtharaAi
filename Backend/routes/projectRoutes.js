// routes/projectRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createProject,
  getProjects,
  addMember
} = require("../Backend/controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.post("/:id/add-member", auth, addMember);

module.exports = router;