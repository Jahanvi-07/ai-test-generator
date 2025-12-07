const Question = require('../models/Question');
const Test = require('../models/Test');
const aiService = require('./aiService');

const createQuestionsFromAI = async (notes, opts = {}) => {
  const generated = await aiService.generateMCQs(notes, opts);
  const created = await Question.insertMany(generated);
  return created;
};

const createTestWithAIQuestions = async (title, notes, opts = {}) => {
  const questions = await createQuestionsFromAI(notes, opts);
  const questionIds = questions.map(q => q._id);
  const test = await Test.create({
    title,
    description: opts.description || '',
    questions: questionIds,
    settings: opts.settings || {}
  });
  return { test, questions };
};

module.exports = { createQuestionsFromAI, createTestWithAIQuestions };
