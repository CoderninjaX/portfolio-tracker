import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function usePortfolio() {
  const [holdings, setHoldings]     = useState([]);
  const [prices, setPrices]         = useState({});
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]           = useState('');

  const fetchPortfolio = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/portfolio');
      setHoldings(data.holdings || []);
      return data.holdings || [];
    } catch (err) {
      setError('Failed to load portfolio');
      return [];
    }
  }, []);

  const fetchPrices = useCallback(async (holdingsList) => {
    if (!holdingsList.length) return;
    const results = {};
    await Promise.allSettled(
      holdingsList.map(async (h) => {
        // Use ticker+exchange as key so RELIANCE:NSE and RELIANCE:BSE are separate
        const key = `${h.ticker}:${h.exchange}`;
        try {
          const { data } = await axios.get(
            `/api/stocks/quote/${h.ticker}?exchange=${h.exchange}`
          );
          results[key] = data;
        } catch {
          // keep old price if fetch fails
        }
      })
    );
    setPrices((prev) => ({ ...prev, ...results }));
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await fetchPortfolio();
      await fetchPrices(list);
      setLoading(false);
    })();
  }, [fetchPortfolio, fetchPrices]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (holdings.length) {
        setRefreshing(true);
        await fetchPrices(holdings);
        setRefreshing(false);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [holdings, fetchPrices]);

  const addStock = async (ticker, companyName, exchange, quantity, buyPrice) => {
    await axios.post('/api/portfolio/add', { ticker, companyName, exchange, quantity, buyPrice });
    const list = await fetchPortfolio();
    await fetchPrices(list);
  };

  const removeStock = async (ticker, exchange) => {
    await axios.delete(`/api/portfolio/${ticker}?exchange=${exchange}`);
    setHoldings((prev) =>
      prev.filter((h) => !(h.ticker === ticker && h.exchange === exchange))
    );
  };

  const getPnL = (holding) => {
    const key = `${holding.ticker}:${holding.exchange}`;
    const current = prices[key]?.price;
    if (!current) return null;
    const invested   = holding.buyPrice * holding.quantity;
    const currentVal = current * holding.quantity;
    const pnl        = currentVal - invested;
    const pnlPct     = ((pnl / invested) * 100).toFixed(2);
    return { invested, currentVal, pnl, pnlPct };
  };

  const totals = holdings.reduce(
    (acc, h) => {
      const p = getPnL(h);
      if (!p) return acc;
      acc.invested   += p.invested;
      acc.currentVal += p.currentVal;
      acc.pnl        += p.pnl;
      return acc;
    },
    { invested: 0, currentVal: 0, pnl: 0 }
  );
  totals.pnlPct = totals.invested
    ? ((totals.pnl / totals.invested) * 100).toFixed(2)
    : '0.00';

  return {
    holdings, prices, loading, refreshing, error,
    addStock, removeStock, getPnL, totals,
    refetch: async () => {
      setRefreshing(true);
      const list = await fetchPortfolio();
      await fetchPrices(list);
      setRefreshing(false);
    },
  };
}