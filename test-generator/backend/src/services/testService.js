const Question = require("../models/Question");
const Test = require("../models/Test");

// Gemini version
const { GoogleGenerativeAI } = require("@google/generative-ai");

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  const client = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  return client.getGenerativeModel({ model: "gemini-pro" });
}

/* OpenAI version
const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
*/

const generateQuestionsAI = async (notes, opts = {}) => {
  const { count = 10, difficulty = "medium", topic = "General", description = "" } = opts;

  const prompt = `
Generate ${count} exam questions.
Topic: ${topic}
Difficulty: ${difficulty}
Notes:
${notes}
Extra instructions:
${description}

Return ONLY JSON:
[
  {
    "question": "",
    "type": "MCQ | Short Answer | Long Answer | True/False | FillBlank",
    "options": ["A","B","C","D"] OR null,
    "answer": ""
  }
]
`;

  // gemini version
  const model = getModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    // Extract JSON from response (might have markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').trim();
    }
    
    const parsed = JSON.parse(jsonText);
    
    // Transform to match Question schema
    return parsed.map((q) => {
      const type = (q.type || "").toLowerCase();
      let questionType = "mcq";
      if (type.includes("short answer") || type === "short") {
        questionType = "short";
      } else if (type.includes("long answer") || type === "long") {
        questionType = "long";
      } else if (type.includes("true/false") || type.includes("truefalse") || type === "true/false") {
        questionType = "truefalse";
      } else {
        questionType = "mcq";
      }

      // Transform options from array of strings to array of objects
      let options = [];
      if (questionType === 'mcq' && Array.isArray(q.options)) {
        options = q.options.map((opt, idx) => ({
          text: String(opt),
          isCorrect: q.answer && String(opt).trim().toLowerCase() === String(q.answer).trim().toLowerCase()
        }));
      } else if (questionType === 'truefalse') {
        options = [
          { text: "True", isCorrect: q.answer && String(q.answer).trim().toLowerCase() === "true" },
          { text: "False", isCorrect: q.answer && String(q.answer).trim().toLowerCase() === "false" }
        ];
      }

      return {
        text: q.question || q.text || "",
        type: questionType,
        options: options,
        difficulty: opts.difficulty || "medium",
        topic: opts.topic || "",
        metadata: { answer: q.answer || "" }
      };
    });
  } catch (err) {
    console.log("Gemini Returned:", text);
    throw new Error("Gemini response is not valid JSON: " + err.message);
  }
};

/* openai
const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(text);

    return parsed.map((q) => ({
      text: q.question || "",
      type:
        (q.type || "").toLowerCase() === "mcq"
          ? "mcq"
          : (q.type || "").toLowerCase() === "short answer"
          ? "short"
          : (q.type || "").toLowerCase() === "long answer"
          ? "long"
          : (q.type || "").toLowerCase() === "true/false"
          ? "truefalse"
          : "mcq",

      options: Array.isArray(q.options)
        ? q.options.map((opt) => ({ text: opt, isCorrect: false }))
        : [],
    }));
  } catch (err) {
    console.log("OpenAI Returned:", text);
    throw new Error("OpenAI response is not valid JSON.");
  }
};
*/

const createQuestionsFromAI = async (notes, opts = {}) => {
  const generated = await generateQuestionsAI(notes, opts);
  return await Question.insertMany(generated);
};

const createTestWithAIQuestions = async (title, notes, opts = {}) => {
  const questions = await createQuestionsFromAI(notes, opts);

  const test = await Test.create({
    title,
    description: opts.description || "",
    createdBy: opts.createdBy || null,
    questions: questions.map((q) => q._id),
    settings: opts.settings || {},
  });

  return { test, questions };
};

module.exports = {
  generateQuestionsAI,
  createQuestionsFromAI,
  createTestWithAIQuestions,
};