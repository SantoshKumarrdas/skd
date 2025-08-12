const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { auth, requireAdmin } = require('../middleware/auth');

// Admin: create question
router.post('/', auth, requireAdmin, async (req, res) => {
  try {
    const { question, options, answerIndex } = req.body;
    if (!question || !options || typeof answerIndex !== 'number') return res.status(400).json({ message: 'Invalid data' });
    const q = new Question({ question, options, answerIndex });
    await q.save();
    res.json(q);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update
router.put('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(q);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: delete
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public: fetch questions (but only question text + options, not answers)
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find({}, '-answerIndex');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: fetch all including answers
router.get('/admin/all', auth, requireAdmin, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
