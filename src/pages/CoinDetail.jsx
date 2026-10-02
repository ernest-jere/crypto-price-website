import { useParams, useNavigate  } from "react-router-dom";
import { fetchCryptos, fetchChartData } from "../api/coinGecko";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatter";
import { ResponsiveContainer, Tooltip } from "recharts";
import { Line, CartesianGrid, XAxis, YAxis, LineChart } from "recharts";

export const CoinDetail = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                // Run both API requests concurrently to speed up load times
                const [cryptoData, historicalData] = await Promise.all([
                    fetchCryptos(),
                    fetchChartData(id)
                ]);

                // Find the specific coin matching the URL param 'id'
                const foundCoin = cryptoData.find(c => c.id === id);
                setCoin(foundCoin || null);

                // Format chart prices
                if (historicalData && historicalData.prices) {
                    const formattedData = historicalData.prices.map((price) => ({
                        time: new Date(price[0]).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        price: parseFloat(price[1].toFixed(2)),
                    }));
                    setChartData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching coin data:", error);
                setCoin(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    // 1. Show a loading state first so "Not Found" doesn't flash prematurely
    if (isLoading) {
        return (
            <div className="loading">
                <p>Loading crypto data ...</p>
            </div>
        );
    }

    // 2. Fallback if coin isn't found in the list
    if (!coin) {
        return (
            <div className="app">
                <div className="no-results">
                    <p>Coin not found</p>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    // FIX: Using flat response fields from /coins/markets API
    const priceChangePercentage = coin.price_change_percentage_24h || 0;
    const isPositive = priceChangePercentage >= 0;

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <span className="rocket-icon">📈</span>
                        <div className="logo-text">
                            <h1>Crypto Prices</h1>
                            <p>Track the latest cryptocurrency prices in real-time</p>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)}>Go Back</button> 
                </div>
            </header>

            <div className="coin-detail">
                <div className="coin-header">
                    {/* FIX: Corrected classname typo to className */}
                    <div className="coin-title">
                        <img src={coin.image} alt={coin.name} />
                        <div>
                            <h1>{coin.name}</h1>
                            <p className="symbol">{coin.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    {/* FIX: Corrected clasName typo to className */}
                    <span className="rank">
                        Rank #{coin.market_cap_rank}
                    </span>
                 </div>
                 <div className="coin-price-section">
                    <div className="current-price">
                        {/* FIX: Removed nested market_data wrappers */}
                        <h2>{formatPrice(coin.current_price)}</h2>
                        <span className={`change-badge ${isPositive ? "positive" : "negative"}`}> 
                            {isPositive ? "▲" : "▼"} {" "}
                            {Math.abs(priceChangePercentage).toFixed(2)}% 
                        </span>
                    </div>
                    <div className="price-ranges">
                        {/* FIX: Corrected invalid attribute names to className */}
                        <div className="price-range">
                            <span className="range-label">24h High</span>
                            <span className="range-value">{formatPrice(coin.high_24h)}</span>
                        </div>
                        <div className="price-range">
                            <span className="range-label">24h Low</span>
                            <span className="range-value">{formatPrice(coin.low_24h)}</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            
                            <XAxis 
                                dataKey="time"
                                stroke="#9CA3AF"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis 
                                stroke="#9CA3AF"
                                style={{ fontSize: "12px" }}
                                domain={['auto', 'auto']} 
                            />

                            <Tooltip contentStyle={{
                                background: "rgba(20, 20, 40, 0.95)",
                                border: "1px solid rgba(225, 225, 225, 0.1)",
                                borderRadius: "8px",
                                color: "#fff",
                            }}/>

                            <Line 
                                dataKey="price"
                                type="monotone"
                                stroke="#ADDBE6"
                                strokeWidth={2} 
                                dot={false} 
                            />
                        </LineChart>
                    </ResponsiveContainer> 
                </div> 
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Market Cap</span>
                        <span className="stat-value">{formatPrice(coin.market_cap)}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Volume (24h)</span>
                        <span className="stat-value">{formatPrice(coin.total_volume)}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Circulating Supply</span>
                        <span className="stat-value">{coin.circulating_supply?.toLocaleString() || "N/A"}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Total Supply</span>
                        <span className="stat-value">{coin.total_supply?.toLocaleString() || "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
