import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, total, incrementQuantity, decrementQuantity } = useCart();

  return (
    <>
      {/* Затемненный фон */}
      {isOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40" 
          onClick={onClose}
        />
      )}

      {/* Боковая панель корзины */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-[384px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Корзина</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center my-8">Корзина пуста</p>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto">
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col border-b pb-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span>{Number(item.price) * item.quantity} ₸</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-lg font-bold">{total} ₸</span>
                </div>
                <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                  className="w-full rounded-lg bg-blue-600 text-white py-3 font-medium hover:bg-blue-700 transition-colors"
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
