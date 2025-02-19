import React from "react";
import axios from "axios";

export function Logout() {
  const handleLogout = async () => {
    try {
      // Hacer una solicitud al servidor para cerrar la sesión
      await axios.post("http://localhost/ESAM2/SystemEsam/src/pages/api/login/logout.php",);

      // Redirigir al usuario a la página de login
      window.location.href = "/login";
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}