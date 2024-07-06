import React, { useState } from "react";
import api from "../api/api"; // Ensure this is the correct path to your api module
import Cookies from "js-cookie";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: Cookies.get("token"),
    user: null,
  });

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (auth.token) {
  //       try {
  //         const response = await api.post("/login", {
  //           headers: { Authorization: `Bearer ${auth.token}` },
  //         });
  //         setAuth((prev) => ({ ...prev, user: response.data }));
  //       } catch (error) {
  //         console.error("Failed to authenticate user", error);
  //         logout();
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, [auth.token]);

  const login = async (userData) => {
    // Remove the destructuring for userData
    try {
      const response = await api.post("/login", userData);
      const { token, user } = response.data; // Destructure user from response.data
      Cookies.set("token", token, { expires: 1 }); // Set cookie with expiry (1 day in this case)
      setAuth({ token, user });

      setTimeout(logout, 24 * 60 * 60 * 1000); // 1 day in milliseconds
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signup = async (userData) => {
    // Remove the destructuring for userData
    try {
      const response = await api.post("/signup", userData);
      const { token, user } = response.data; // Destructure user from response.data
      Cookies.set("token", token, { expires: 1 }); // Set cookie with expiry (1 day in this case)
      setAuth({ token, user });

      setTimeout(logout, 24 * 60 * 60 * 1000); // 1 day in milliseconds
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = async () => {
    await api.post("/logout");
    Cookies.remove("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
