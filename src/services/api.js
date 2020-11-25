import axios from "axios";
import { TOKEN_KEY, CLIENT_KEY, UID_KEY } from "../config/constants";

const dev_url = "http://localhost:3000/v1/";
const production_url = "https://meetingfy-api.herokuapp.com/v1/";

export const baseURL = production_url;

const api = axios.create({
  baseURL,
  headers: {
    'access-token': localStorage.getItem(TOKEN_KEY),
    'client': localStorage.getItem(CLIENT_KEY),
    'uid': localStorage.getItem(UID_KEY),
  },
});

export default api;
