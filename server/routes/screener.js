const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');
const STOCK_UNIVERSE = require('../stockUniverse');

router.use(protect);

// Fetch quote for a single stock from Yahoo Finance
const fetchQuote = async (ticker) => {
  try {
    const symbol = `${ticker}.NS`;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000,
    });
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || !meta.regularMarketPrice) return null;

    return {
      price: meta.regularMarketPrice,
      previousClose: meta.chartPreviousClose,
      change: parseFloat((meta.regularMarketPrice - meta.chartPreviousClose).toFixed(2)),
      changePercent: parseFloat(((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose * 100).toFixed(2)),
      marketCap: meta.marketCap || null,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh || null,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow || null,
    };
  } catch {
    return null;
  }
};

// Classify market cap
const getCapType = (marketCap) => {
  if (!marketCap) return 'Unknown';
  const crore = marketCap / 1e7;
  if (crore >= 20000) return 'Large Cap';
  if (crore >= 5000) return 'Mid Cap';
  return 'Small Cap';
};

// @route   POST /api/screener
// @desc    Screen stocks by filters
// @body    { sector, capType, minPrice, maxPrice, gainers, losers }
// @access  Private
router.post('/', async (req, res) => {
  const { sector, capType, minPrice, maxPrice, gainers, losers } = req.body;

  // Filter universe by sector first (cheap, no API call)
  let candidates = STOCK_UNIVERSE;
  if (sector && sector !== 'All') {
    candidates = candidates.filter(s => s.sector === sector);
  }

  // Fetch live data in parallel (max 20 at a time to avoid rate limits)
  const batch = candidates.slice(0, 20);
  const results = await Promise.allSettled(
    batch.map(async (stock) => {
      const quote = await fetchQuote(stock.ticker);
      if (!quote) return null;
      return {
        ticker: stock.ticker,
        name: stock.name,
        sector: stock.sector,
        exchange: stock.exchange,
        price: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        marketCap: quote.marketCap,
        capType: getCapType(quote.marketCap),
        fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
      };
    })
  );

  let stocks = results
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value);

  // Apply filters
  if (capType && capType !== 'All') {
    stocks = stocks.filter(s => s.capType === capType);
  }
  if (minPrice) {
    stocks = stocks.filter(s => s.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    stocks = stocks.filter(s => s.price <= parseFloat(maxPrice));
  }
  if (gainers) {
    stocks = stocks.filter(s => s.changePercent > 0);
    stocks.sort((a, b) => b.changePercent - a.changePercent);
  }
  if (losers) {
    stocks = stocks.filter(s => s.changePercent < 0);
    stocks.sort((a, b) => a.changePercent - b.changePercent);
  }

  res.json({ stocks, count: stocks.length });
});

module.exports = router;