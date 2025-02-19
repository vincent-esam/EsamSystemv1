import { useState, useEffect } from "react";

// Tipos para las props y los datos del país
interface Idioma {
  idIdioma: number;
  idioma: string;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

interface IdiomaSelectProps {
  selectedIdioma: { id: number; name: string };
  onIdiomaChange: (selectedGrado: { id: number; name: string }) => void;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

function IdiomasSelect({ selectedIdioma, onIdiomaChange, valueAndId,
    selected, selectedId }: IdiomaSelectProps) {
  const [idiomas, setIdioma] = useState<Idioma[]>([]); // Lista de países

  // Obtener los países desde la API al montar el componente
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await fetch("/api/idiomas/idiomas");
        if (response.ok) {
          const data: Idioma[] = await response.json();
          setIdioma(data); // Actualiza la lista de países
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
      Idiomas:
      <select
      name={valueAndId}
      id={valueAndId}
        value={selectedIdioma?.id || ""}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value, 10);
          const idioma = idiomas.find((m) => m.idIdioma === selectedId);
          if (idioma) {
            onIdiomaChange({ id: idioma.idIdioma, name: idioma.idioma });
          }
        }}
      >
        <option value={selectedId} selected>{selected}</option>
        {idiomas.map((idioma) => (
          <option key={idioma.idIdioma} value={idioma.idIdioma}>
            {idioma.idioma}
          </option>
        ))}
      </select>
    </label>
  );
}

export default IdiomasSelect;