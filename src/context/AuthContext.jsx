// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedName = localStorage.getItem("adminName");

    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setAdminName(storedName || "");
    }
    setLoading(false); // Finaliza la carga
  }, []);

  const login = (name) => {
    setIsAuthenticated(true);
    setAdminName(name);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("adminName", name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, adminName, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
