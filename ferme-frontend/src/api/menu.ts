export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  available: boolean
  image?: string
}

const API_URL = "https://fermi-production-2dd4.up.railway.app/api/items/";

export async function fetchMenu(): Promise<MenuItem[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Ошибка загрузки меню");
  return response.json();
}
