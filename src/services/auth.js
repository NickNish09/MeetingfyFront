import api from "./api";
import { openNotificationWithIcon } from "../helpers/notifications";
import { TOKEN_KEY } from "../config/constants";

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_KEY) === null) return false;

  return true;
};

export const sendLoginRequest = (values) => {
  const { email, password } = values;
  return api.post("auth/sign_in", {
    email,
    password,
  });
};

export const sendRegisterRequest = (values) => {
  const { email, password, name } = values;
  return api.post("auth/", {
    email,
    password,
    name,
  });
};
