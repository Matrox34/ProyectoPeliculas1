const API_URL = "http://localhost/apiPeliculas";

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

  const data = await response.json();
  return data;
}
