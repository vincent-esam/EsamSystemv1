import React, { useEffect, useState } from "react";
import axios from "axios";
import "./headerDash.css";

export const HeaderDash: React.FC = () => {
  const [idDocente, setIdDocente] = useState<string | null>(null);
  const [docenteNombre, setDocenteNombre] = useState<string | null>(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState<string | null>(null);
  const [idRol, setIdRol] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost/ESAM2/SystemEsam/src/pages/api/login/check.php", { withCredentials: true })
      .then((response) => {
        if (response.data.authenticated) {
          const { idRol, idDocente, nombre, apellidoPaterno } = response.data;

          // Verificar si el usuario tiene un rol válido
          if (idRol == 2 || idRol == 3) {
            window.location.href = "/login";
            return;
          }

          // Guardar los datos en el estado
          setIdRol(idRol);
          setIdDocente(idDocente);
          setDocenteNombre(nombre);
          setDocenteApellidoPaterno(apellidoPaterno);
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error al verificar la sesión:", error);
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost/ESAM2/SystemEsam/src/pages/api/login/logout.php", { withCredentials: true })
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <> 
      <header>
        <a id="logoEsam" href="/dashboardDoc"> </a>
        <h1 id="titulo-head">Docente Plataforma</h1>
        <a id="logoEsamMobile" href="/dashboardDoc">
          <h1 id="tituloMobile">Docente Plataforma</h1>
        </a>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>
      <div className="barraAmarilla"></div>
    </>
  );
};

export default HeaderDash;
