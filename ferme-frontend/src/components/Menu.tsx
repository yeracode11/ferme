import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image?: string;
  category: string;
};

type Category = {
  id: string;
  name: string;
};

const CATEGORIES: Category[] = [
  { id: 'all', name: 'Все блюда' },
  { id: 'first', name: 'Первые блюда' },
  { id: 'second', name: 'Вторые блюда' },
  { id: 'garnish', name: 'Гарнир' },
];

export default function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки меню");
        }
        return res.json();
      })
      .then((data) => {
        console.log('Полученные данные:', data);
        if (Array.isArray(data)) {
          console.log('Меню:', data);
          setMenu(data);
        } else if (data && typeof data === 'object' && 'results' in data) {
          console.log('Меню из results:', data.results);
          setMenu(data.results);
        } else {
          throw new Error('Неверный формат данных');
        }
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setError("Не удалось загрузить меню");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter(item => {
        console.log(`Проверка элемента:`, item);
        console.log(`Категория элемента: ${item.category}, выбранная категория: ${selectedCategory}`);
        return item.category === selectedCategory;
      });

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Меню</h1>

      {/* Фильтр категорий */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Сетка меню */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMenu.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={Number(item.price)}
            image={item.image}
          />
        ))}
      </div>

      {/* Сообщение, если нет блюд в выбранной категории */}
      {filteredMenu.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          В этой категории пока нет блюд
        </div>
      )}
    </div>
  );
}