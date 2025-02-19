import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
export const AcademicoDashboard = () => {
  const [idDocente, setIdDocente] = useState(null);
  const [idRol, setIdRol] = useState(null);
  const [docenteNombre, setDocenteNombre] = useState(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState(null);

  useEffect(() => {
    // Verificar la sesión con el endpoint check.php
    axios.get("http://localhost/ESAM2/SystemEsam/src/pages/api/login/check.php")
      .then((response) => {
        console.log("Respuesta de check.php:", response.data); 
        if (response.data.authenticated) {
          // Si el usuario está autenticado, obtener los datos de la sesión
          const idRol = response.data.idRol;

          // Redirigir si el rol no es el correcto
          if (idRol == 4) {
            window.location.href = "/login";
            return;
          }

          // Obtener más datos de la sesión si es necesario
          setIdRol(idRol);
        } else {
          // Si no está autenticado, redirigir al login
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.error("Error al verificar la sesión:", err);
        window.location.href = "/login";
      });
  }, []);
};