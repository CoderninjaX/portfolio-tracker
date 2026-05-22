// Curated list of popular NSE stocks across sectors
// Yahoo Finance symbol = ticker + .NS
const STOCK_UNIVERSE = [
  // Large Cap — Banking & Finance
  { ticker: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', exchange: 'NSE' },
  { ticker: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', exchange: 'NSE' },
  { ticker: 'SBIN', name: 'State Bank of India', sector: 'Banking', exchange: 'NSE' },
  { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', exchange: 'NSE' },
  { ticker: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', exchange: 'NSE' },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'Finance', exchange: 'NSE' },
  { ticker: 'BAJAJFINSV', name: 'Bajaj Finserv', sector: 'Finance', exchange: 'NSE' },

  // IT
  { ticker: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', exchange: 'NSE' },
  { ticker: 'INFY', name: 'Infosys', sector: 'IT', exchange: 'NSE' },
  { ticker: 'WIPRO', name: 'Wipro', sector: 'IT', exchange: 'NSE' },
  { ticker: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', exchange: 'NSE' },
  { ticker: 'TECHM', name: 'Tech Mahindra', sector: 'IT', exchange: 'NSE' },
  { ticker: 'LTIM', name: 'LTIMindtree', sector: 'IT', exchange: 'NSE' },

  // Pharma & Biotech
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', exchange: 'NSE' },
  { ticker: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories', sector: 'Pharma', exchange: 'NSE' },
  { ticker: 'CIPLA', name: 'Cipla', sector: 'Pharma', exchange: 'NSE' },
  { ticker: 'DIVISLAB', name: 'Divi\'s Laboratories', sector: 'Pharma', exchange: 'NSE' },
  { ticker: 'BIOCON', name: 'Biocon', sector: 'Pharma', exchange: 'NSE' },
  { ticker: 'APOLLOHOSP', name: 'Apollo Hospitals', sector: 'Healthcare', exchange: 'NSE' },
  { ticker: 'MANKIND', name: 'Mankind Pharma', sector: 'Pharma', exchange: 'NSE' },

  // Energy & Oil
  { ticker: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', exchange: 'NSE' },
  { ticker: 'ONGC', name: 'Oil & Natural Gas Corp', sector: 'Energy', exchange: 'NSE' },
  { ticker: 'POWERGRID', name: 'Power Grid Corp', sector: 'Energy', exchange: 'NSE' },
  { ticker: 'NTPC', name: 'NTPC', sector: 'Energy', exchange: 'NSE' },
  { ticker: 'ADANIGREEN', name: 'Adani Green Energy', sector: 'Energy', exchange: 'NSE' },

  // Auto
  { ticker: 'MARUTI', name: 'Maruti Suzuki', sector: 'Auto', exchange: 'NSE' },
  { ticker: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', exchange: 'NSE' },
  { ticker: 'M&M', name: 'Mahindra & Mahindra', sector: 'Auto', exchange: 'NSE' },
  { ticker: 'BAJAJ-AUTO', name: 'Bajaj Auto', sector: 'Auto', exchange: 'NSE' },
  { ticker: 'EICHERMOT', name: 'Eicher Motors', sector: 'Auto', exchange: 'NSE' },

  // FMCG
  { ticker: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', exchange: 'NSE' },
  { ticker: 'ITC', name: 'ITC', sector: 'FMCG', exchange: 'NSE' },
  { ticker: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG', exchange: 'NSE' },
  { ticker: 'DABUR', name: 'Dabur India', sector: 'FMCG', exchange: 'NSE' },
  { ticker: 'MARICO', name: 'Marico', sector: 'FMCG', exchange: 'NSE' },

  // Metals & Mining
  { ticker: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', exchange: 'NSE' },
  { ticker: 'JSWSTEEL', name: 'JSW Steel', sector: 'Metals', exchange: 'NSE' },
  { ticker: 'HINDALCO', name: 'Hindalco Industries', sector: 'Metals', exchange: 'NSE' },
  { ticker: 'VEDL', name: 'Vedanta', sector: 'Metals', exchange: 'NSE' },

  // Telecom & Tech
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', exchange: 'NSE' },
  { ticker: 'ZOMATO', name: 'Zomato', sector: 'Tech', exchange: 'NSE' },
  { ticker: 'NYKAA', name: 'FSN E-Commerce (Nykaa)', sector: 'Tech', exchange: 'NSE' },
  { ticker: 'PAYTM', name: 'One 97 Communications', sector: 'Fintech', exchange: 'NSE' },

  // Infra & Real Estate
  { ticker: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', exchange: 'NSE' },
  { ticker: 'ULTRACEMCO', name: 'UltraTech Cement', sector: 'Infrastructure', exchange: 'NSE' },
  { ticker: 'DLF', name: 'DLF', sector: 'Real Estate', exchange: 'NSE' },
];

module.exports = STOCK_UNIVERSE;