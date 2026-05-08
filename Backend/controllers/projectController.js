const Project = require("../models/Project");

// ✅ CREATE PROJECT
exports.createProject = async (req, res) => {
  try {

    const {
      name,
      description,
    } = req.body;

    const project = await Project.create({
      name,
      description,

      // ✅ Creator
      createdBy: req.user.id,

      // ✅ Creator automatically member
      members: [req.user.id],
    });

    res.json(project);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// ✅ GET PROJECTS
exports.getProjects = async (req, res) => {
  try {

    let projects;

    // ✅ ADMIN sees all projects
    if (req.user.role === "ADMIN") {

      projects = await Project.find()
        .populate("members", "name email");

    } else {

      // ✅ MEMBER sees only own projects
      projects = await Project.find({
        members: req.user.id,
      }).populate(
        "members",
        "name email"
      );
    }

    res.json(projects);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// ✅ ADD MEMBER
exports.addMember = async (req, res) => {
  try {

    const { userId } = req.body;

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
      });
    }

    // ✅ Only creator/admin
    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        msg: "Not allowed",
      });
    }

    // ✅ Prevent duplicates
    if (
      project.members.includes(userId)
    ) {
      return res.status(400).json({
        msg: "User already added",
      });
    }

    project.members.push(userId);

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
