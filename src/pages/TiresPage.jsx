import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import BarWithFilter from "../components/BarWithFilter";
import TireCard from "../components/TireCard";
import { SidebarProvider } from "../context/SidebarContext";
import "../TiresPage.css";

export const TiresPage = () => {
  const [tires, setTires] = useState([]);
  const [filteredTires, setFilteredTires] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/neumaticos")
      .then((response) => {
        setTires(response.data);
        setFilteredTires(response.data);
      })
      .catch((error) => console.error("Error al obtener neumáticos:", error));
  }, []);

  const handleSearchResults = (results) => {
    setFilteredTires(results);
  };

  const handleEdit = (tire) => {
    console.log("Editar neumático:", tire);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/neumaticos/${id}`)
      .then(() => {
        setTires((prevTires) => prevTires.filter((tire) => tire.id !== id));
        setFilteredTires((prevFiltered) =>
          prevFiltered.filter((tire) => tire.id !== id)
        );
      })
      .catch((error) => console.error("Error al eliminar neumático:", error));
  };

  return (
    <SidebarProvider>
      <div className="container_main">
        <Sidebar />
        <div className="content">
          <BarWithFilter onSearchResults={handleSearchResults} />
          <div className="background-index">
            <h1 className="title-card" style={{ color: "white" }}>
              Stock de Llantas
            </h1>
            <div className="tires-grid">
              {filteredTires.length > 0 ? (
                filteredTires.map((tire) => (
                  <TireCard
                    key={tire.id}
                    tire={tire}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p style={{ color: "white" }}>
                  No se encontraron neumáticos.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
