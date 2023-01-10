//API_URL sera el link del deploy o localhost, este archivo configura eso
const VITE_API_URL = import.meta.env.VITE_API_URL
const VITE_API_PORT = import.meta.env.VITE_API_PORT
const API_URL =
  VITE_API_URL === "localhost"
    ? `http://${VITE_API_URL}:${VITE_API_PORT}`
    : `https://${VITE_API_URL}`;
export default API_URL