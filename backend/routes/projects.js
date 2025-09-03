
const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = new Project({
      title,
      description,
      userId: req.user._id
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Task.deleteMany({ projectId: req.params.id });
    
    await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    res.json({ message: 'Project and associated tasks deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;