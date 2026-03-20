import express from 'express';
import Journal from '../models/Journal.js';

const router = express.Router();

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const journal = new Journal(req.body);
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(journal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Journal entry deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
