const Task = require("../models/Task");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      dueDate,
    } = req.body;

    // ✅ Logged in user
    const userId = req.user.id;

    const task = await Task.create({
      title,
      description,
      assignedTo: userId,
      projectId,
      dueDate,
    });

    res.json(task);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// ✅ GET USER TASKS ONLY
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({
      assignedTo: userId,
    }).populate(
      "assignedTo",
      "name email"
    );

    res.json(tasks);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// ✅ UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Find only user's task
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    res.json(task);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
