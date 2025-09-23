import { useState } from "react";
import type { FC } from "react";
import { useCart } from "../context/CartContext";
import MenuItemModal from "./MenuItemModal";

interface MenuCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
}

const MenuCard: FC<MenuCardProps> = ({ id, name, price, description, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cart.find(item => item.id === id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Не открывать модальное окно при клике на кнопки
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest('button') || e.target.tagName === 'BUTTON')
    ) {
      return;
    }
    setIsModalOpen(true);
  };
  return (
    <div 
      className="bg-white rounded-2xl shadow p-3 md:p-4 flex flex-col h-[30rem] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <img
        src={image || "https://via.placeholder.com/200"}
        alt={name}
        className="h-60 w-full object-cover rounded-lg"
      />
      <h3 className="mt-3 text-lg font-semibold line-clamp-1">{name}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      <p className="mt-2 text-lg font-bold text-blue-600">{price} ₸</p>
      <div className="mt-auto pt-4">
        {!cartItem ? (
          <button
            onClick={() => addToCart({ id, name, description, price: price.toString(), image, available: true })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
          >
            В корзину
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => decrementQuantity(id)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
            >
              -
            </button>
            <span className="flex-1 text-center font-medium">{cartItem.quantity}</span>
            <button
              onClick={() => incrementQuantity(id)}
              className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <MenuItemModal
          item={{
            id,
            name,
            description,
            price: price.toString(),
            available: true,
            image
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuCard;
