import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}

export default function Header({ showCart, setShowCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center bg-blue-600 text-white p-4 z-40">
        {/* Бургер меню */}
        <button
          className="flex flex-col justify-center items-center w-10 h-10 space-y-1"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>

        {/* Лого + название */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ferme Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Fermi</h1>
        </Link>

        {/* Кнопка корзины */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-white text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {showCart ? (
            // крестик
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ) : (
              // корзина
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            )}
          {itemsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs leading-5 text-center">
              {itemsCount}
            </span>
          )}
        </button>
      </header>

      {/* Отступ, чтобы контент не заезжал под фиксированный header */}
      <div className="h-16" />

      {/* Оверлей */}
      {menuOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-10"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Боковое меню */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white p-6 z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <nav className="mt-10 space-y-4">
          <a href="/" className="block hover:underline">
            Меню
          </a>
          <Link to="/promotions" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Акции
          </Link>
          <Link to="/contacts" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Контакты
          </Link>
        </nav>
      </aside>
    </div>
  );
}
