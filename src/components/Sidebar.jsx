import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, AddCircle, Edit } from "@mui/icons-material"; // Importamos los íconos
import { useSidebar } from "../context/SidebarContext";
import "../Sidebar.css";
import LogoLlantera from "../assets/img/LlanteraLogo.png";
import "@fontsource/libre-baskerville";

function Sidebar() {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();

  // Verifica si la ruta actual es la de edición
  const isEditRoute = location.pathname.startsWith("/Editar");

  // Estado para manejar el colapso automático en pantallas pequeñas
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false);

  useEffect(() => {
    // Función para controlar el colapso automático según el tamaño de la pantalla
    const handleResize = () => {
      if (window.innerWidth <= 718) {
        setIsAutoCollapsed(true);  // Colapsa el sidebar en pantallas pequeñas
      } else {
        setIsAutoCollapsed(false); // Permite la expansión en pantallas grandes
      }
    };

    // Llama a handleResize al cambiar el tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Llama a handleResize para verificar el tamaño inicial de la pantalla
    handleResize();

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Usamos el estado de colapso automático para forzar que el sidebar esté colapsado en pantallas pequeñas
  const currentSidebarState = isAutoCollapsed || isSidebarCollapsed;

  return (
    <>
      {/* Botón de colapso, solo visible en pantallas grandes */}
      {window.innerWidth > 718 && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {currentSidebarState ? "☰" : "✕"}
        </button>
      )}

      <div className={`sidebar ${currentSidebarState ? "collapsed" : ""}`}>
        <div className="logo-container">
          <Link to="/llantas">
            <img src={LogoLlantera} alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link
              to="/llantas"
              className={`nav-link ${location.pathname === "/llantas" ? "active" : ""}`}
            >
              <Home className="nav-icon" />
              {!currentSidebarState && "INICIO"}
            </Link>
          </li>
          <li>
            <Link
              to="/nuevallanta"
              className={`nav-link ${location.pathname === "/nuevallanta" ? "active" : ""}`}
            >
              <AddCircle className="nav-icon" />
              {!currentSidebarState && "AGREGAR"}
            </Link>
          </li>
          {isEditRoute && (
            <li>
              <Link
                to={location.pathname}
                className={`nav-link ${isEditRoute ? "active" : ""}`}
              >
                <Edit className="nav-icon" />
                {!currentSidebarState && "EDITAR"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
