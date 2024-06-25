import api from "./api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
