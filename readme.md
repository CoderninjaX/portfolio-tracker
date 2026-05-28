PortFolio — AI-Powered Indian Stock Portfolio Tracker & Screener
Built a full-stack investment platform with a real-time NSE/BSE portfolio tracker and an AI-powered stock screener covering 148 stocks across Nifty 50, Next 50, and Midcap 50
Integrated Groq LLaMA 3.1 to parse plain-English queries into structured screener filters — e.g. "large cap pharma under ₹2000" — using a custom prompt engineering pipeline
Implemented JWT-based authentication, bcrypt password hashing, and protected REST API routes across an Express + MongoDB backend
Fetched live NSE/BSE stock prices and portfolio P&L in INR via Yahoo Finance public API with 60-second auto-refresh
Deployed frontend on Vercel and backend on Render with MongoDB Atlas; handled production issues including CORS, environment variables, and React Router on Vercel

Live Demo
https://portfolio-tracker-bgcy5p5j5-coderninjaxs-projects.vercel.app

Screenshots
![alt text](</img/login.png>)

![alt text](</img/search.png>)
![alt text](</img/portfolio.png>)

Features

 -> User Authentication — Secure register/login with JWT and bcrypt password hashing
 -> NSE & BSE Support — Search and add stocks from both exchanges; same stock can be tracked on each exchange separately
 -> Live Prices — Real-time stock prices via Yahoo Finance, auto-refreshed every 60 seconds
 -> P&L Tracking — Per-holding and total portfolio profit/loss in INR with percentage change
 -> Portfolio Summary — Total invested, current value, overall gain/loss at a glance
 -> Dark UI — Clean dark-themed dashboard built for traders

 Tech Stack
Layer                               Technology                                                                          Frontend                            React 18, Vite, React Router v6                                                    Backend                             Node.js, Express.js                                                            Database                            MongoDB Atlas,                                                                                                             Auth                                JWT, bcryptjs                                                                            Stock Data                          Yahoo Finance public API via Axios
Deploy                              Vercel (frontend), Render (backend)


Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account (free tier)

1. Clone the repo: git clone https://github.com/your-username/portfolio-tracker.git
cd portfolio-tracker

2. Setup the backend
cd server
npm install
cp .env.example .env

3. Setup the frontend
cd client
npm install
npm run dev
Visit http://localhost:5173


Author
Vivek Chakravarti- CoderninjaX(Github)
linkedIn- https://www.linkedin.com/in/vivek-chakravarti-64271131b/