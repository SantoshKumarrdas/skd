const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Question = require('../models/Question');
const { auth, requireAdmin } = require('../middleware/auth');
const mongoose = require('mongoose');

// submit result (student)
router.post('/', auth, async (req, res) => {
  try {
    const { answers } = req.body; // array of { questionId, selectedIndex }
    if (!Array.isArray(answers)) return res.status(400).json({ message: 'Invalid answers' });

    let score = 0;
    for (const a of answers) {
      if (!mongoose.Types.ObjectId.isValid(a.questionId)) continue;
      const q = await Question.findById(a.questionId);
      if (!q) continue;
      if (q.answerIndex === a.selectedIndex) score += 1;
    }
    const total = answers.length;
    const result = new Result({ student: req.user.id, score, total });
    await result.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get student's results
router.get('/my', auth, async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id }).populate('student', 'name email');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// admin leaderboard
router.get('/leaderboard', auth, requireAdmin, async (req, res) => {
  try {
    const results = await Result.aggregate([
      {
        $group: {
          _id: "$student",
          avgScore: { $avg: "$score" },
          attempts: { $sum: 1 },
          lastScore: { $last: "$score" }
        }
      },
      { $sort: { avgScore: -1 } },
      { $limit: 20 }
    ]);
    // populate student names
    const populated = await Promise.all(results.map(async r => {
      const user = await mongoose.model('User').findById(r._id).select('name email');
      return { student: user, avgScore: r.avgScore, attempts: r.attempts, lastScore: r.lastScore };
    }));
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
