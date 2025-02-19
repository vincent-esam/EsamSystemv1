import React, { useState } from "react";
import axios from "axios";


const Logina: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/ESAM2/SystemEsam/src/pages/api/login/auth.php",
        formData
      );
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem("user", response.data.user);
        window.location.href = "/";
      }
    } catch (error) {
      setError("Error de conexión con el servidor: " + error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
};

export default Logina;