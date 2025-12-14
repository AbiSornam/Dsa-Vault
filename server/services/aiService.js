const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.generateExplanation = async ({ question, code }) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro"   // ✅ SAFE MODEL
  });

  const prompt = `
You are a DSA expert.

Explain the following solution strictly in JSON with:
- intuition
- steps (array of strings)
- timeComplexity
- spaceComplexity

Return ONLY valid JSON. No markdown.

Problem:
${question}

Code:
${code}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return {
      error: "AI returned non-JSON",
      raw: text
    };
  }
};
