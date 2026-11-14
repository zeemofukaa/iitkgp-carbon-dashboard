export const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function getJSON(path, params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
  ).toString();

  const res = await fetch(`${API}${path}${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`${path} failed (${res.status})`);
  return res.json();
}
