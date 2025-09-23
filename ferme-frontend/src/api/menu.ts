export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image?: string
}

const API_URL = "http://127.0.0.1:8000/api/items/";

export async function fetchMenu(): Promise<MenuItem[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Ошибка загрузки меню");
  return response.json();
}
