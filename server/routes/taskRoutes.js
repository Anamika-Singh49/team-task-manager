const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create Task
router.post("/create", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get All Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update Task Status
router.put("/update/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(task);
});

// Delete Task
router.delete("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;