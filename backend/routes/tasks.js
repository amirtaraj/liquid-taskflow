import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new task
// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const task = new Task({ title, description, date });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    let update = { ...req.body };
    // Only set updatedAt if editing title, description, or date
    if (typeof req.body.title === 'string' || typeof req.body.description === 'string' || typeof req.body.date === 'string') {
      update.updatedAt = new Date();
    }
    if (typeof req.body.completed === "boolean") {
      update.completedAt = req.body.completed ? new Date() : null;
    }
    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
