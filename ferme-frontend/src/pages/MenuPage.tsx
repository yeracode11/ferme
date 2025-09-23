import { useEffect, useState } from "react";
import { fetchMenu } from "../api/menu";
import type { MenuItem } from "../api/menu";

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu()
      .then(setItems)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Загрузка...</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border bg-white shadow p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-500 flex-1">{item.description}</p>
          <p className="mt-2 font-bold text-blues-600">{item.price} ₸</p>
          <button
            disabled={!item.available}
            className={`mt-3 rounded-lg px-4 py-2 text-white ${
              item.available ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
            }`}
          >
            {item.available ? "Заказать" : "Нет в наличии"}
          </button>
        </div>
      ))}
    </div>
  );
}
