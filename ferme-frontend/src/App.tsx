import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Header from "./components/Header";
import ContactsPage from "./pages/ContactsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PromotionsPage from "./pages/PromotionsPage";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showCart={showCart} setShowCart={setShowCart} />
      <main className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
        </Routes>
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </main>
    </div>
  );
}

export default App;
