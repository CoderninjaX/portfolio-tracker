const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// @route   POST /api/ai/screen
// @desc    Parse natural language query into screener filters using Groq
// @body    { query: "show me large cap pharma stocks under 2000" }
// @access  Private
router.post('/screen', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: 'Query is required' });

  const systemPrompt = `You are a stock screener assistant for Indian stock markets (NSE/BSE).
Extract filter parameters from the user's query and return ONLY a JSON object with these fields:
- sector: one of [Banking, Finance, IT, Pharma, Healthcare, Energy, Auto, FMCG, Metals, Telecom, Tech, Fintech, Infrastructure, Real Estate, All]
- capType: one of [Large Cap, Mid Cap, Small Cap, All]
- minPrice: number or null
- maxPrice: number or null
- gainers: boolean (true if user wants top gainers)
- losers: boolean (true if user wants top losers)
- summary: one short sentence describing what the user is looking for

Return ONLY valid JSON, no markdown, no explanation.`;

  try {
    const { data } = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        max_tokens: 200,
        temperature: 0.1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = data.choices[0]?.message?.content?.trim();

    let filters;
    try {
      filters = JSON.parse(raw);
    } catch {
      return res.status(500).json({ message: 'AI could not parse your query. Try rephrasing.' });
    }

    res.json({ filters, summary: filters.summary });
  } catch (err) {
    res.status(500).json({ message: 'AI service error: ' + err.message });
  }
});

module.exports = router;