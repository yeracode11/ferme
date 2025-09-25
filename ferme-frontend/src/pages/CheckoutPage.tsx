import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  comment?: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderForm>({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Показываем индикатор загрузки
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.setAttribute('disabled', 'true');
        submitButton.textContent = 'Оформление заказа...';
      }

      // Формируем данные заказа для API
      // Преобразуем цену в строку, так как бэкенд ожидает строку
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        comment: formData.comment || "",
        status: "new",
        items: cart.map(item => ({
          menu_item: item.id,
          quantity: item.quantity,
          price_at_time: item.price
        }))
      };

      // Отправляем заказ на сервер
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || 
          'Ошибка при создании заказа. Пожалуйста, проверьте введенные данные.'
        );
      }

      // Показываем уведомление об успешном оформлении заказа
      alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
      
      // Очищаем корзину и возвращаемся на главную
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    } finally {
      // Восстанавливаем кнопку
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        submitButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Оформить заказ
        `;
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-600 mb-4">Добавьте товары в корзину для оформления заказа</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Оформление заказа</h1>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {/* Детали заказа */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start justify-between pb-4 border-b">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.quantity} шт.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{Number(item.price) * item.quantity} ₸</p>
                  <p className="text-sm text-gray-600">{item.price} ₸ за шт.</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Итого:</span>
                <span>{total} ₸</span>
              </div>
            </div>
          </div>
        </div>

        {/* Форма оформления */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Информация о доставке</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Номер телефона *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Адрес доставки *
              </label>
              <textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Укажите адрес доставки"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Комментарий к заказу
              </label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Дополнительная информация к заказу"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Оформить заказ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
