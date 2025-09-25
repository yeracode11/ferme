import { useEffect } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import type { MenuItem } from "../api/menu";

interface MenuItemModalProps {
  item: MenuItem;
  onClose: () => void;
}

const MenuItemModal: FC<MenuItemModalProps> = ({ item, onClose }) => {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);

  // Escape закрывает модалку
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Затемнённый фон */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Модальное окно */}
      <div
        className="relative bg-white rounded-2xl p-4 md:p-6 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Содержимое */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Изображение */}
          <div className="md:w-1/2">
            <img
              src={item.image || "https://via.placeholder.com/400"}
              alt={item.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Информация */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
            <p className="text-gray-600 mb-6">{item.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-blue-600">
                {item.price} ₸
              </span>
              {!cartItem ? (
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  В корзину
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Дополнительная информация */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Информация о блюде:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Все блюда по 600-700гр с гарниром</li>
                <li>• Можно заказать с собой</li>
                <li>• {item.available ? "В наличии" : "Нет в наличии"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("modal-root") || document.body
  );
};

export default MenuItemModal;
