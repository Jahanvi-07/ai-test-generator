const { v4: uuidv4 } = require('uuid');

/**
 * aiService.generateMCQs(notes, opts)
 * - notes: string or array of strings (syllabus / topic)
 * - opts: { count, difficulty, topic }
 * Returns array of question objects { text, type, options, difficulty, topic }
 *
 * NOTE: Replace stub with actual LLM call (OpenAI/Azure/etc).
 */

const generateMCQs = async (notes, opts = {}) => {
  const count = opts.count || 5;
  const difficulty = opts.difficulty || 'medium';
  const topic = opts.topic || 'General';

  // === STUB: deterministic pseudo-random generator to produce plausible MCQs ===
  const samples = [];
  for (let i = 0; i < count; i++) {
    const id = uuidv4().slice(0, 8);
    const qText = `Generated question ${id} on ${topic} (difficulty: ${difficulty}). Use the syllabus material to answer.`;
    const options = [
      { text: 'Option A', isCorrect: i % 4 === 0 },
      { text: 'Option B', isCorrect: i % 4 === 1 },
      { text: 'Option C', isCorrect: i % 4 === 2 },
      { text: 'Option D', isCorrect: i % 4 === 3 }
    ];
    samples.push({
      text: qText,
      type: 'mcq',
      options,
      difficulty,
      topic
    });
  }
  return samples;
};

module.exports = { generateMCQs };
