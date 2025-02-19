import { useState, useEffect } from "react";

// Tipos para las props y los datos del país
interface Modalidad {
  idModalidad: number;
  tipo: string;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

interface ModalidadSelectProps {
  selectedModalidad: { id: number; name: string };
  onModalidadChange: (selectedModalidad: { id: number; name: string }) => void;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

function ModalidadesSelect({ selectedModalidad, onModalidadChange, valueAndId,
    selected,selectedId }: ModalidadSelectProps) {
  const [modalidades, setModalidades] = useState<Modalidad[]>([]); // Lista de países

  // Obtener los países desde la API al montar el componente
  useEffect(() => {
    const fetchModalidades = async () => {
      try {
        const response = await fetch("/api/modalidades/modalidades"); // Cambia la ruta a la de tu API
        if (response.ok) {
          const data: Modalidad[] = await response.json();
          setModalidades(data); // Actualiza la lista de países
        } else {
          console.error("Error al obtener las modalidades");
        }
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    };

    fetchModalidades();
  }, []);

  return (
    <label>
      Modalidad:
      <select
      name={valueAndId}
      id={valueAndId}
        value={selectedModalidad?.id || ""}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value, 10);
          const modalidad = modalidades.find((m) => m.idModalidad === selectedId);
          if (modalidad) {
            onModalidadChange({ id: modalidad.idModalidad, name: modalidad.tipo });
          }
        }}
      >
        <option value={selectedId} selected>{selected}</option>
        {modalidades.map((modalidad) => (
          <option key={modalidad.idModalidad} value={modalidad.idModalidad}>
            {modalidad.tipo}
          </option>
        ))}
      </select>
    </label>
  );
}

export default ModalidadesSelect;
