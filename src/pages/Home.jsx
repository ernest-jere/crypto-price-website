import { useEffect, useState } from "react"; // 🚀 Fixed: Removed unused 'use'
import { fetchCryptos } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";

export const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid"); 
    const [sortBy, setSortBy] = useState("market_cap_rank"); 
    const [searchQuery, setSearchQuery] = useState(""); // 🚀 Fixed: Corrected typo from 'querry' to 'query'

    useEffect(() => {
        fetchCryptoData();
    }, []);

    useEffect(() => {
        filterAndSort();
    }, [cryptoList, sortBy, searchQuery]);

    const fetchCryptoData = async () => {
        try {
            const data = await fetchCryptos(); 
            setCryptoList(data);
        } catch (error) {
            console.error("Failed to print data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterAndSort = () => {
        let filtered = cryptoList.filter(crypto =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "market_cap_rank": 
                    return a.market_cap_rank - b.market_cap_rank;
                case "name":
                    return a.name.localeCompare(b.name);
                case "price": // 🚀 Fixed: CoinGecko uses 'current_price'
                    return a.current_price - b.current_price;
                case "price_desc": 
                    return b.current_price - a.current_price;
                case "change": // 🚀 Fixed: Corrected 42h typo to 24h
                    return b.price_change_percentage_24h - a.price_change_percentage_24h;
                case "market_cap":
                    return b.market_cap - a.market_cap;
                default:
                    return a.market_cap_rank - b.market_cap_rank;
            }
        });
        setFilteredList(filtered);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    {/* Left Side Group */}
                    <div className="logo-section">
                        <span className="rocket-icon">📈</span>
                        <div className="logo-text">
                            <h1>Crypto Prices</h1>
                            <p>Track the latest cryptocurrency prices in real-time</p>
                        </div>
                    </div>

                    {/* Right Side Group - Moved out of logo-section to push it to the far end */}
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search cryptocurrencies..."
                            className="search-input"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                </div>
            </header>

            <div className="controls">
                <div className="filter-group">
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="market_cap_rank">Rank</option>
                        <option value="name">Name</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="change">24h Change</option>
                        <option value="market_cap">Market Cap</option>
                    </select>
                </div>

                <div className="view-toggle">
                    <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
                        Grid
                    </button>
                    <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>
                        List
                    </button>
                </div>
            </div>
            {
                isLoading ? (
                    <div className="loading">
                        <div className="spinner" />
                        <p>Loading crypto data ...</p>
                    </div>
                ) : (
                    <div className={`crypto-container ${viewMode}`}>
                        { filteredList.map((crypto) => (
                            <CryptoCard crypto={crypto} key={crypto.id}/>
                        ))}
                    </div>)
            }
            <footer className="footer">
                <p>© 2024 Crypto Prices. All rights reserved.</p>
                <p>data provided by CoinGecko API . Updated every 30 seconds.</p>
            </footer>
        </div>
    );
}