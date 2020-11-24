import React, { createContext, useState, useContext } from "react";
import { USER_KEY } from "../config/constants";

export const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY)));

  const currentUserObject = {
    user: user,
    setUser: (data) => {
      setUser(data);
      localStorage.setItem(USER_KEY, JSON.stringify(data));
    },
  };

  return (
    <CurrentUserContext.Provider value={currentUserObject}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("userCurrentUser must be used within CurrentUserProvider");
  }

  return context;
};
