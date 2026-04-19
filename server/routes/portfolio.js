const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// @route   GET /api/portfolio
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) return res.json({ holdings: [] });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/portfolio/add
router.post('/add', async (req, res) => {
  const { ticker, companyName, exchange, quantity, buyPrice } = req.body;

  if (!ticker || !companyName || !exchange || !quantity || !buyPrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user._id, holdings: [] });
    }

    // Match on ticker + exchange (same stock on NSE and BSE are separate holdings)
    const existing = portfolio.holdings.find(
      (h) => h.ticker === ticker.toUpperCase() && h.exchange === exchange
    );

    if (existing) {
      const totalQty = existing.quantity + Number(quantity);
      const avgPrice =
        (existing.buyPrice * existing.quantity + Number(buyPrice) * Number(quantity)) / totalQty;
      existing.quantity = totalQty;
      existing.buyPrice = parseFloat(avgPrice.toFixed(4));
    } else {
      portfolio.holdings.push({ ticker, companyName, exchange, quantity, buyPrice });
    }

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/portfolio/:ticker
// @query   exchange: NSE | BSE
router.delete('/:ticker', async (req, res) => {
  try {
    const { exchange } = req.query;
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const initialLength = portfolio.holdings.length;
    portfolio.holdings = portfolio.holdings.filter((h) => {
      if (exchange) {
        return !(h.ticker === req.params.ticker.toUpperCase() && h.exchange === exchange);
      }
      return h.ticker !== req.params.ticker.toUpperCase();
    });

    if (portfolio.holdings.length === initialLength) {
      return res.status(404).json({ message: 'Stock not found in portfolio' });
    }

    await portfolio.save();
    res.json({ message: 'Stock removed', portfolio });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;