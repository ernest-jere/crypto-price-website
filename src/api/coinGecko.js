const BASE_URL = "https://api.coingecko.com/api/v3";
// Vite loads environment variables from import.meta.env
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY; 

export const fetchCryptos = async () => {
    // Optional: Protect against missing environment variables
    if (!API_KEY) {
        console.error("CoinGecko API key is missing. Check your .env file.");
    }
    
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const fetchChartData = async (coinId) => {
    if (!API_KEY) {
        console.error("CoinGecko API key is missing. Check your .env file.");
    }
    const response = await fetch(`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}; 
