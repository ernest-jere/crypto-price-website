import { formatPrice, formatMarketCap } from "../utils/formatter";
import { Link } from "react-router-dom";

export const CryptoCard = ({ crypto }) => {
    const uppercaseSymbol = crypto?.symbol?.toUpperCase() || "";

    return (

        <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="crypto-card">
                <div className="crypto-header">
                    <div className="crypto-info">
                        <img src={crypto.image} alt={crypto.name} />
                        <div>
                            <h3>{crypto.name}</h3>
                            <p className="symbol">{uppercaseSymbol}</p>
                            <span className="rank">#{crypto.market_cap_rank}</span>
                        </div>
                    </div>
                </div>
                <div className="crypto-price">
                    <p className="price">{formatPrice(crypto.current_price)}</p> 
                    <p className={`change ${crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}> 
                        {crypto.price_change_percentage_24h >= 0 ? "▲" : "▼"} {" "}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}% 
                    </p>
                </div>
                <div className="crypto-stats">
                    <div className="stat">
                        <span className="stat-label">Market Caps</span>
                        <span className="stat-value">
                            ${formatMarketCap(crypto.market_cap)}
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Volume (24h)</span>
                        <span className="stat-value">
                            ${formatMarketCap(crypto.total_volume)}
                        </span>
                    </div>
                </div>
            </div>   
        </Link>
    );
};
