// controllers/projectController.js
const Project = require("../Backend/models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email");

    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "Not found" });

    // Only creator can add members
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    project.members.push(userId);
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};