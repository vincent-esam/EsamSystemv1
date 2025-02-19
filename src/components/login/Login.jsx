import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    axios.get("http://localhost/ESAM2/SystemEsam/src/pages/api/login/check.php")// Crear un endpoint en PHP para verificar la sesión
      .then((response) => {
        if (response.data.authenticated) {
          const idRol = response.data.idRol;
          if (idRol == 4) {
            window.location.href = "/dashboardDoc";
          } else if (idRol == 2 || idRol == 3) {
            window.location.href = "/";
          }
        }
      })
      .catch((err) => {
        console.error("Error al verificar la sesión:", err);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost/ESAM2/SystemEsam/src/pages/api/login/login.php", 
        { usuario, password }, 
        { withCredentials: true }  // Agregar esto en cada petición
      );

      if (response.data.success) {
        // Redirigir según el rol
        const idRol = response.data.idRol;
        if (idRol == 4) {
          window.location.href = "/dashboardDoc";
        } else if (idRol == 2 || idRol == 3) {
          window.location.href = "/";
        }
      } else {
        setError(response.data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al hacer login:", err);
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  const handleRegister = () => {
    window.location.href = "/login/registro/indexRegistro";
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-box">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="register-text">
          ¿No tienes una cuenta?{" "}
          <span className="register-link" onClick={handleRegister}>
            REGÍSTRATE
          </span>
        </p>
      </div>
    </div>
  );
};