// controlleconst Task = require("../models/Task");rs/taskController.js
const Task = require("../Backend/models/Task");

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
    const tasks = await Task.find()
      .populate("assignedTo", "name email");

    console.log("TASKS FROM DB:", tasks); // debug

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