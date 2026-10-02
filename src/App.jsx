// 🚀 FIXED: Changed import path from "react-router" to "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Home } from "./pages/Home";
import { CoinDetail } from "./pages/CoinDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}


