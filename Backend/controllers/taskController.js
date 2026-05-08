const Task = require("../models/Task");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      assignedTo,
      projectId,
      dueDate,
    } = req.body;

    let finalAssignedUser;

    // ✅ ADMIN can assign tasks
    if (req.user.role === "ADMIN") {

      finalAssignedUser = assignedTo;

    } else {

      // ✅ MEMBER can only assign to self
      finalAssignedUser = req.user.id;
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: finalAssignedUser,
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

// ✅ GET TASKS
exports.getTasks = async (req, res) => {
  try {

    let tasks;

    // ✅ ADMIN sees all tasks
    if (req.user.role === "ADMIN") {

      tasks = await Task.find()
        .populate(
          "assignedTo",
          "name email role"
        );

    } else {

      // ✅ MEMBER sees own tasks
      tasks = await Task.find({
        assignedTo: req.user.id,
      }).populate(
        "assignedTo",
        "name email role"
      );
    }

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

    let task;

    // ✅ ADMIN can update any task
    if (req.user.role === "ADMIN") {

      task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    } else {

      // ✅ MEMBER only own tasks
      task = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          assignedTo: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );
    }

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
