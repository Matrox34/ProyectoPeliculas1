const API_URL = "https://ruxxcluster.online/peliculas-admin/apiPeliculas";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any
) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return await response.json();
}