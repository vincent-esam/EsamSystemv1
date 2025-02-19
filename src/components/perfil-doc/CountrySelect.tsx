import { useState, useEffect } from "react";

// Tipos para las props y los datos del país
interface Country {
  idPais: number;
  nombre: string;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

interface CountrySelectProps {
  selectedCountry: { id: number; name: string };
  onCountryChange: (selectedCountry: { id: number; name: string }) => void;
  valueAndId: string;
  selected: string;
  selectedId: number;
}

function CountrySelect({ selectedCountry, onCountryChange, valueAndId,
    selected,selectedId }: CountrySelectProps) {
  const [paises, setPaises] = useState<Country[]>([]); // Lista de países

  // Obtener los países desde la API al montar el componente
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch("/api/paises/paises"); // Cambia la ruta a la de tu API
        if (response.ok) {
          const data: Country[] = await response.json();
          setPaises(data); // Actualiza la lista de países
        } else {
          console.error("Error al obtener los países");
        }
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    };

    fetchPaises();
  }, []);

  return (
    <label>
      País:
      <select
      name={valueAndId}
      id={valueAndId}
        value={selectedCountry?.id || ""}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value, 10);
          const country = paises.find((p) => p.idPais === selectedId);
          if (country) {
            onCountryChange({ id: country.idPais, name: country.nombre });
          }
        }}
      >
        <option value={selectedId} selected>{selected}</option>
        {paises.map((pais) => (
          <option key={pais.idPais} value={pais.idPais}>
            {pais.nombre}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CountrySelect;
