PortFolio — Indian Stock Portfolio Tracker
A full-stack MERN application to track your Indian stock market investments across NSE and BSE in real-time.

Live Demo


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