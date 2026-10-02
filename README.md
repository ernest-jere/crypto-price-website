# 📈 Crypto Prices Tracker

A modern, real-time cryptocurrency price tracker built with **React**, **Vite**, and **Recharts**. The application fetches live market statistics and historical 7-day performance data directly from the **CoinGecko API**.

👉 **[Live Demo URL](https://vercel.app)**

## 🚀 Features

- **Live Market Dashboard:** Tracks the top cryptocurrencies by market capitalization.
- **Deep-Dive Details:** In-depth statistics per asset, including market cap, volume, 24h highs/lows, and circulating supply.
- **Interactive Visualizations:** Sleek, responsive 7-day historical price tracking powered by Recharts line graphs.
- **Robust Failure-Safe Guardrails:** Clean, asynchronous state loading layouts with unified error catching and dynamic UI routing fallbacks.

## 🛠️ Tech Stack

- **Framework:** React (Vite template)
- **Routing:** React Router DOM
- **Charts:** Recharts
- **Data Source:** CoinGecko API v3

## 💻 Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory of your project and append your developer credentials:
   ```env
   VITE_COINGECKO_API_KEY=your_coingecko_api_key_here
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```

## 📦 Deployment Configuration

### Deploying to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com) via GitHub.
2. Select **Import** on your project repository.
3. In the **Environment Variables** section, ensure you provide your production values:
   - **Key:** `VITE_COINGECKO_API_KEY`
   - **Value:** *[Your Secret CoinGecko API Key]*
4. Click **Deploy**.

### Client-Side Routing Note
If you experience `404 Not Found` issues when refreshing the detail pages (`/coin/:id`) on Vercel, add a `vercel.json` file to your root directory to properly route requests back to the main index entrypoint:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
