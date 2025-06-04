import type { Producto } from  "../types/producto";


export async function fetchCatalog(url: string): Promise<Producto[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error al obtener el catálogo desde ${url}`);
  return await response.json();
}
