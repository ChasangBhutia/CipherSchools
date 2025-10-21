import { createContext, useContext, useEffect, useState } from "react";
import { getUser, login, register } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(1);

  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      if (response.data.success) {
        setUser(response.data.data);
        navigate("/");
        alert(response.data.message);
        setRefresh(refresh + 1);
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
        navigate("/");
        alert(response.data.message);
        setRefresh(refresh + 1);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error(`Error fetching user: ${err.message}`);
      }
    };
    fetchUser();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
