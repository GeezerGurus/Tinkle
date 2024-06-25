import api from "./api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    console.log("Signup successful:", response);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const signin = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    console.log("Signin successful:", response);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
