const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Create Project
router.post("/create", async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description
  });

  res.json(project);
});

// Get All Projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;