import api from "./api";

export const register = (userData) => {
  return api.post("/users", userData);
};

export const login = (userData) => {
  return api.post("/users/login", userData);
};

export const logout = () => {
  return api.post("/users/logout");
};
