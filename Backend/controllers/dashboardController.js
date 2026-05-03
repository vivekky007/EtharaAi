// controllers/dashboardController.js
const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "DONE").length;
    const pending = tasks.filter(t => t.status !== "DONE").length;
    const overdue = tasks.filter(
      t => t.dueDate && t.dueDate < new Date() && t.status !== "DONE"
    ).length;

    res.json({ total, completed, pending, overdue });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};