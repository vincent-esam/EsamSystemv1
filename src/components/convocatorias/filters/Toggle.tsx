import React, { useState, useEffect } from "react";
import "../../../styles/docenteSearch.css";

// Componente Toggle
export const ToggleEstado: React.FC<{ idConvocatoria: number; estadoInicial: string }> = ({ idConvocatoria, estadoInicial }) => {
  const [estado, setEstado] = useState(estadoInicial);

  // Sincroniza el estado interno con el valor de `estadoInicial` cuando cambie
  useEffect(() => {
    setEstado(estadoInicial);
  }, [estadoInicial]);

  const handleToggle = async () => {
    const nuevoEstado = estado === "abierta" ? "cerrada" : "abierta";
    console.log(`Estado antes: ${estado}, Nuevo Estado: ${nuevoEstado}`);
    setEstado(nuevoEstado); // Actualizamos el estado localmente

    try {
      const response = await fetch("/api/convocatorias/updateEstado", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idConvocatoria, estado: nuevoEstado }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      console.log("Estado actualizado correctamente");
    } catch (error) {
      console.error(error);
      setEstado(estado); // Revertimos el estado en caso de error
    }
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        checked={estado === "abierta"}
        onChange={handleToggle}
        className="toggle-input"
        id={`toggle-${idConvocatoria}`}
      />
      <label htmlFor={`toggle-${idConvocatoria}`} className="toggle-slider"></label>
    </div>
  );
};