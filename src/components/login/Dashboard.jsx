import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";  
import { DashboardDoc } from "./DashboardDoc";


export const Dashboard = () => {
  const [idDocente, setidDocente] = useState(null);
  const [idRol, setidRol] = useState(null);
  const [docenteNombre, setDocenteNombre] = useState(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idRol = localStorage.getItem("idRol");
    if(!token || idRol==2 || idRol==3){
      window.location.href = "/login";
    }

    try {
      // Decodificar el token para obtener los datos del usuario
      const decodedToken = jwt_decode(token);
      const idDocente = decodedToken.idDocente;
      const nombre = decodedToken.nombre;
      const apellidoPaterno = decodedToken.apellidoPaterno;
      const idRol = decodedToken.idRol;

      // Almacenar los datos en el localStorage para otros componentes
      localStorage.setItem("idDocente", idDocente);
      localStorage.setItem("docenteNombre", nombre);
      localStorage.setItem("docenteApellidoPaterno", apellidoPaterno);
      localStorage.setItem("idRol", idRol);
      setidDocente(idDocente);
      setDocenteNombre(nombre);
      setDocenteApellidoPaterno(apellidoPaterno);
      setidRol(idRol);
      
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      window.location.href = "/login";
    }
    finally {
      setLoading(false); // Marca como cargado
    }
  }, []);

  
 
  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }
  return (
    <div>
      
      {idDocente && <DashboardDoc client:load />}
      

    </div>
  );
};
