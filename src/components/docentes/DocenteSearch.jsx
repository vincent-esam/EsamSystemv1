import { useState, useEffect } from "react";
import { DocenteFilter } from "../filters/DocenteFilter";
import { DocenteFilterByGrade } from "../filters/DocenteFilterByGrade";
import { ResultadosDocentes } from "./ResultadosDocentes";
import "../../styles/docenteSearch.css";
import axios from "axios"; 

export const DocenteSearch = () => {
  const [allDocentes, setAllDocentes] = useState([]); // Todos los docentes originales
  const [filteredDocentes, setFilteredDocentes] = useState([]); // Estado para los docentes filtrados
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [statusFilter, setStatusFilter] = useState(""); 

  // Función para obtener datos de la API
  useEffect(() => {
    const fetchDocentes = async (searchTerm = "") => {
      try {
        const response = await axios.get(
          "http://localhost/ESAM2/SystemEsam/src/pages/api/docentes/postulantes.php"
        );
        setAllDocentes(response.data);
        setFilteredDocentes(response.data.filter((docente) => docente.estado === "postulante"));
        setLoading(false);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        setLoading(false);
      }
    };
  
    fetchDocentes();
  }, []); 
  
  
  // El arreglo vacío asegura que esto se ejecute solo al cargar el componente

  const handleSearch = (searchTerm) => {
    let filtered = allDocentes;
  
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
  
      filtered = filtered.filter(
        (docente) =>
          // Buscar por nombre, correo o documento
          (docente.nombres && docente.nombres.toLowerCase().includes(searchLower)) ||
          (docente.correo && docente.correo.toLowerCase().includes(searchLower)) ||
          (docente.numeroDocumento && docente.numeroDocumento.toString().includes(searchTerm)) ||
          // Buscar por postgrado
          (docente.estudiosuperiores &&
            docente.estudiosuperiores.some(
              (estudio) =>
                estudio.tipo === "postgrado" &&
                estudio.nombre &&
                estudio.nombre.toLowerCase().includes(searchLower)
            )) ||
          // Buscar por cursos
          (docente.cursos &&
            docente.cursos.some((curso) =>
              curso.nombre &&
              curso.nombre.toLowerCase().includes(searchLower)
            ))
      );
    } else {
      // Si no hay término de búsqueda, mostrar solo los postulantes
      filtered = allDocentes.filter((docente) => docente.estado === "postulante");
    }
  
    setFilteredDocentes(filtered);
  };

  // Manejar cambios en el filtro de grado académico
  const handleGradeChange = (selectedGrado) => {
    const filtered = selectedGrado
      ? allDocentes.filter((docente) =>
          docente.estudiosuperiores.some(
            (estudio) => estudio.gradoTipo === selectedGrado
          )
        )
      : allDocentes;
    setFilteredDocentes(filtered);
  };

    const handleStatusChange = (status) => {
      setStatusFilter(status); // Actualizar el estado del filtro
      let filtered = allDocentes;
      if (status === "agendado"){
        filtered= allDocentes.filter((docente) => docente.agendado === 1 && docente.estado===  "postulante")
      }
      else if (status === "aprobado" || status === "rechazado") {
        filtered = allDocentes.filter(
          (docente) => docente.estado.toLowerCase() === status.toLowerCase()
        );
      } else {
        // Si no se selecciona ningún filtro, o se selecciona "postulante", mostrar solo los postulantes
        filtered = allDocentes.filter((docente) => docente.estado === "postulante");
      }
    
      setFilteredDocentes(filtered); // Actualizar los docentes filtrados
    };
    

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="docente-search-container">
      <div className="filters-container">
        <DocenteFilter onSearch={handleSearch} />
        <DocenteFilterByGrade onGradeChange={handleGradeChange} />
        
        <label htmlFor="estado-select">Buscar por estado</label>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="postulante">Todos</option>
          <option value="agendado">Agendados</option>
          <option value="aprobado">Aprobados</option>
          <option value="rechazado">Rechazados</option>
        </select>
      </div>

      <div className="results-container">
        {filteredDocentes.length > 0 ? ( 
          filteredDocentes.map((docente) => (
            <ResultadosDocentes
              key={docente.idDocente}
              nombres={docente.nombres}
              correo={docente.correo}
              numeroDocumento={docente.numeroDocumento}
              telefono={docente.telefono}
              idDocente={docente.idDocente}
            />
          ))
        ) : (
          <p className="no-results">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};
