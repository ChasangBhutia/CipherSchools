import { createContext, useContext, useState } from "react";
import { login, register } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      if (response.data.success) {
        setUser(response.data.data);
        alert(response.data.message);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await login(userData);
      if (response.data.success) {
        setUser(response.data.data);
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
