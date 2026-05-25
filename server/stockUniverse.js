// Curated list of popular NSE stocks across sectors
// Yahoo Finance symbol = ticker + .NS
const STOCK_UNIVERSE = [
  // Banking
  { ticker: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', capType: 'Large Cap' },
  { ticker: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', capType: 'Large Cap' },
  { ticker: 'SBIN', name: 'State Bank of India', sector: 'Banking', capType: 'Large Cap' },
  { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', capType: 'Large Cap' },
  { ticker: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', capType: 'Large Cap' },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'Finance', capType: 'Large Cap' },
  { ticker: 'BAJAJFINSV', name: 'Bajaj Finserv', sector: 'Finance', capType: 'Large Cap' },

  // IT
  { ticker: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', capType: 'Large Cap' },
  { ticker: 'INFY', name: 'Infosys', sector: 'IT', capType: 'Large Cap' },
  { ticker: 'WIPRO', name: 'Wipro', sector: 'IT', capType: 'Large Cap' },
  { ticker: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', capType: 'Large Cap' },
  { ticker: 'TECHM', name: 'Tech Mahindra', sector: 'IT', capType: 'Mid Cap' },
  { ticker: 'LTIM', name: 'LTIMindtree', sector: 'IT', capType: 'Large Cap' },

  // Pharma
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', capType: 'Large Cap' },
  { ticker: 'DRREDDY', name: "Dr. Reddy's Laboratories", sector: 'Pharma', capType: 'Large Cap' },
  { ticker: 'CIPLA', name: 'Cipla', sector: 'Pharma', capType: 'Large Cap' },
  { ticker: 'DIVISLAB', name: "Divi's Laboratories", sector: 'Pharma', capType: 'Large Cap' },
  { ticker: 'BIOCON', name: 'Biocon', sector: 'Pharma', capType: 'Mid Cap' },
  { ticker: 'APOLLOHOSP', name: 'Apollo Hospitals', sector: 'Healthcare', capType: 'Large Cap' },
  { ticker: 'MANKIND', name: 'Mankind Pharma', sector: 'Pharma', capType: 'Mid Cap' },

  // Energy
  { ticker: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', capType: 'Large Cap' },
  { ticker: 'ONGC', name: 'Oil & Natural Gas Corp', sector: 'Energy', capType: 'Large Cap' },
  { ticker: 'POWERGRID', name: 'Power Grid Corp', sector: 'Energy', capType: 'Large Cap' },
  { ticker: 'NTPC', name: 'NTPC', sector: 'Energy', capType: 'Large Cap' },
  { ticker: 'ADANIGREEN', name: 'Adani Green Energy', sector: 'Energy', capType: 'Large Cap' },

  // Auto
  { ticker: 'MARUTI', name: 'Maruti Suzuki', sector: 'Auto', capType: 'Large Cap' },
  { ticker: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', capType: 'Large Cap' },
  { ticker: 'M&M', name: 'Mahindra & Mahindra', sector: 'Auto', capType: 'Large Cap' },
  { ticker: 'BAJAJ-AUTO', name: 'Bajaj Auto', sector: 'Auto', capType: 'Large Cap' },
  { ticker: 'EICHERMOT', name: 'Eicher Motors', sector: 'Auto', capType: 'Mid Cap' },

  // FMCG
  { ticker: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', capType: 'Large Cap' },
  { ticker: 'ITC', name: 'ITC', sector: 'FMCG', capType: 'Large Cap' },
  { ticker: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG', capType: 'Large Cap' },
  { ticker: 'DABUR', name: 'Dabur India', sector: 'FMCG', capType: 'Mid Cap' },
  { ticker: 'MARICO', name: 'Marico', sector: 'FMCG', capType: 'Mid Cap' },

  // Metals
  { ticker: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', capType: 'Large Cap' },
  { ticker: 'JSWSTEEL', name: 'JSW Steel', sector: 'Metals', capType: 'Large Cap' },
  { ticker: 'HINDALCO', name: 'Hindalco Industries', sector: 'Metals', capType: 'Large Cap' },
  { ticker: 'VEDL', name: 'Vedanta', sector: 'Metals', capType: 'Mid Cap' },

  // Telecom & Tech
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', capType: 'Large Cap' },
  { ticker: 'ZOMATO', name: 'Zomato', sector: 'Tech', capType: 'Large Cap' },
  { ticker: 'NYKAA', name: 'FSN E-Commerce (Nykaa)', sector: 'Tech', capType: 'Mid Cap' },
  { ticker: 'PAYTM', name: 'One 97 Communications', sector: 'Fintech', capType: 'Small Cap' },

  // Infra & Real Estate
  { ticker: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', capType: 'Large Cap' },
  { ticker: 'ULTRACEMCO', name: 'UltraTech Cement', sector: 'Infrastructure', capType: 'Large Cap' },
  { ticker: 'DLF', name: 'DLF', sector: 'Real Estate', capType: 'Large Cap' },
];

module.exports = STOCK_UNIVERSE;