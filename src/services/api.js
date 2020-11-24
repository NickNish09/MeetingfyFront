import axios from "axios";
import { TOKEN_KEY } from "../config/constants";

const dev_url = "http://localhost:3000/v1/";
const production_url = "https://rivalry-api.tk/v1/";

export const baseURL = dev_url;

const api = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  },
});

export default api;
