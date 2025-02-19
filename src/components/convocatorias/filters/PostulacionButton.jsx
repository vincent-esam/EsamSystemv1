import { useState, useEffect } from "react";

const PostulacionButton = ({ convocatoriaId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [yaPostulado, setYaPostulado] = useState(false);

  useEffect(() => {
    const verificarPostulacion = async () => {
      if (!convocatoriaId) return;
  
      try {
        const idDocente = localStorage.getItem("idDocente");
        if (!idDocente) return;
  
        const response = await fetch(`/api/convocatorias/postulantes/${convocatoriaId}?idDocente=${idDocente}`);
        const data = await response.json();
  
        if (data.postulantes && Array.isArray(data.postulantes)) {
          // Verificamos si el docente ya está en la lista de postulantes
          setYaPostulado(data.postulantes.some(p => p.idDocente === idDocente));
        }
      } catch (err) {
        console.error("Error al verificar postulación:", err);
      }
    };
  
    verificarPostulacion();
  }, [convocatoriaId]);

  const handlePostular = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("token");
    const idDocente = localStorage.getItem("idDocente");

    if (!token || !idDocente) {
      alert("Debe iniciar sesión primero.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("/api/convocatorias/postulantes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idConvocatoria: convocatoriaId, idDocente }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al realizar la postulación.");
      }

      setSuccessMessage("¡Postulación realizada con éxito!");
      setYaPostulado(true); // Cambia el estado para no mostrar el botón nuevamente
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {yaPostulado ? (
        <p style={{ color: "green", fontWeight: "bold" }}>¡Ya postulado!!</p>
      ) : (
        <button
          type="button"
          className="postulate-button"
          onClick={handlePostular}
          disabled={loading}
        >
          {loading ? "Enviando..." : "POSTULATE YA!"}
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <style jsx>{`
        .postulate-button {
          display: inline-block;
          background: #0b5f9a;
          color: white;
          padding: 12px 20px;
          text-align: center;
          border-radius: 8px;
          font-size: 16px;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .postulate-button:hover {
          background: #095184;
          transform: scale(1.05);
        }

        .postulate-button:disabled {
          background: #b0c4de;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default PostulacionButton;

