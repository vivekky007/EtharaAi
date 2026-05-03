// controllers/taskController.js
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, projectId, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      projectId,
      dueDate
    });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};