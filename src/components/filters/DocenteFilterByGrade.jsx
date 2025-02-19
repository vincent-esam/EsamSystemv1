import React, { useState, useEffect } from "react";

export const DocenteFilterByGrade = ({ onGradeChange }) => {
  const [selectedGrado, setSelectedGrado] = useState("");
  const [grados, setGrados] = useState([]); // Estado para almacenar los grados obtenidos de la API
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener los grados desde la API
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await fetch("http://localhost/ESAM2/SystemEsam/src/pages/api/docentes/grados.php");
        if (!response.ok) throw new Error("Error al obtener los grados");
        const data = await response.json();
        setGrados(data); // Actualiza el estado con los datos obtenidos
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los grados:", error);
        setLoading(false);
      }
    };

    fetchGrados();
  }, []); // Solo se ejecuta al montar el componente

  const handleGradeChange = (event) => {
    const grado = event.target.value;
    setSelectedGrado(grado);
    onGradeChange(grado); // Pasa el grado seleccionado al componente padre
  };

  if (loading) {
    return <p>Cargando grados...</p>;
  }

  return (
    <div>
      <label htmlFor="grado-select">Nivel Académico</label>
      <select id="grado-select" value={selectedGrado} onChange={handleGradeChange}>
        <option value="">Seleccionar Grado</option> {/* Cambié 'postulante' por un valor vacío */}
        {grados.map((grado) => (
          <option key={grado.idGrado} value={grado.tipo}>
            {grado.tipo}
          </option>
        ))}
      </select>
    </div>
  );
};
