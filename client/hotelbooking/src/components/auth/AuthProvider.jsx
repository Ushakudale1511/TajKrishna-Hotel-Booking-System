import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
    userId: "",
    role: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    if (token && userId) {
      setAuth({ token, userId, role });
    }
  }, []);

  const handleLogin = (token, userId, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", role);

    setAuth({ token, userId, role });
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: "", userId: "", role: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
