export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

// Turn relative paths like "uploads/abc.jpg" or "/uploads/abc.jpg" into absolute URLs.
// Leaves absolute URLs (http/https/data) untouched.
export const absUrl = (url) => {
  if (!url) return "";
  if (/^(https?:|data:)/i.test(url)) return url;

  const base = API_BASE.replace(/\/+$/, "");
  const path = String(url).replace(/^\/+/, "");
  return `${base}/${path}`;
};
