const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  answerIndex: { type: Number, required: true } // index into options
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
