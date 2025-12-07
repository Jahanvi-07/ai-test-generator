const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: String,
  isCorrect: { type: Boolean, default: false }
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'short', 'long', 'truefalse'], default: 'mcq' },
  options: [OptionSchema],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  topic: { type: String },
  metadata: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
