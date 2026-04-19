const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

const toYahooSymbol = (ticker, exchange) => {
  const t = ticker.toUpperCase().trim();
  if (exchange === 'NSE') return `${t}.NS`;
  if (exchange === 'BSE') return `${t}.BO`;
  return t;
};

// @route   GET /api/stocks/quote/:ticker?exchange=NSE|BSE
router.get('/quote/:ticker', async (req, res) => {
  try {
    const symbol = toYahooSymbol(req.params.ticker, req.query.exchange);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) return res.status(404).json({ message: 'Stock not found' });

    const change = meta.regularMarketPrice - meta.chartPreviousClose;
    const changePct = ((change / meta.chartPreviousClose) * 100).toFixed(2);

    res.json({
      ticker: req.params.ticker.toUpperCase(),
      symbol,
      price: meta.regularMarketPrice,
      change: parseFloat(change.toFixed(2)),
      changePercent: `${changePct}%`,
      currency: meta.currency,
      shortName: meta.shortName || meta.longName,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch quote: ' + err.message });
  }
});

// @route   GET /api/stocks/search/:query?exchange=NSE|BSE
router.get('/search/:query', async (req, res) => {
  try {
    const exchange = req.query.exchange || 'NSE';
    const suffix = exchange === 'NSE' ? '.NS' : '.BO';

    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(req.params.query)}&quotesCount=10&newsCount=0`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const results = (data?.quotes || [])
      .filter((q) => q.symbol?.endsWith(suffix))
      .slice(0, 8)
      .map((q) => ({
        ticker: q.symbol.replace(/\.(NS|BO)$/, ''),
        symbol: q.symbol,
        name: q.shortname || q.longname || q.symbol,
        exchange,
        type: q.quoteType,
      }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed: ' + err.message });
  }
});

module.exports = router;