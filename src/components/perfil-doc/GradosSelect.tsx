import { useState, useEffect } from "react";

// Tipos para las props y los datos del país
interface Grado {
  idGrado: number;
  tipo: string;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

interface GradoSelectProps {
  selectedGrado: { id: number; name: string };
  onGradoChange: (selectedGrado: { id: number; name: string }) => void;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

function GradosSelect({ selectedGrado, onGradoChange, valueAndId,
    selected, selectedId }: GradoSelectProps) {
  const [grados, setGrado] = useState<Grado[]>([]); // Lista de países

  // Obtener los países desde la API al montar el componente
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await fetch("/api/grados/grados");
        if (response.ok) {
          const data: Grado[] = await response.json();
          setGrado(data); // Actualiza la lista de países
        } else {
          console.error("Error al obtener los grados");
        }
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    };

    fetchGrados();
  }, []);

  return (
    <label>
      Grado:
      <select
      name={valueAndId}
      id={valueAndId}
        value={selectedGrado?.id || ""}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value, 10);
          const grado = grados.find((m) => m.idGrado === selectedId);
          if (grado) {
            onGradoChange({ id: grado.idGrado, name: grado.tipo });
          }
        }}
      >
        <option value={selectedId} selected>{selected}</option>
        {grados.map((grado) => (
          <option key={grado.idGrado} value={grado.idGrado}>
            {grado.tipo}
          </option>
        ))}
      </select>
    </label>
  );
}

export default GradosSelect;
