import { useState, useEffect } from "react";
import { ConvocatoriaFilter } from "./filters/ConvocatoriaFilter";
import { ResultadosConvocatorias } from "./filters/ResultadosConvocatorias";
import { FormularioConvocatoria } from "./filters/FormularioConvocatoria";
import { ResultadosPostulantes } from "./filters/ResultadosPostulantes";
import { Modal } from "../util/modale";
import "../../styles/docenteSearch.css";
export const ConvocatoriasList = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [filteredConvocatorias, setFilteredConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [convocatoriaSeleccionada, setConvocatoriaSeleccionada] = useState(null);
  const [convocatoriaToEdit, setConvocatoriaToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Si no hay fecha, retornar vacío
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };
  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const response = await fetch(
          "http://localhost:4321/api/convocatorias/convocatorias"
        );
        if (!response.ok) throw new Error("Error al obtener las convocatorias");
        const data = await response.json();
  
        // Formatear las fechas en los datos recibidos
        const formattedData = data.map((convocatoria) => ({
          ...convocatoria,
          fechaInicio: formatDate(convocatoria.fechaInicio), // Formatear fecha de inicio
          fechaFinal: formatDate(convocatoria.fechaFinal), // Formatear fecha final
          postulantes: convocatoria.postulantes.map((postulante) => ({
            ...postulante,
            fechaPostulacion: formatDate(postulante.fechaPostulacion), // Formatear fecha de postulación
          })),
        }));
  
        // Filtrar las convocatorias para mostrar solo las de estado "abierta"
        const convocatoriasAbiertas = formattedData.filter(
          (convocatoria) => convocatoria.estado.toLowerCase() === "abierta"
        );
  
        setConvocatorias(formattedData); // Guardar todas las convocatorias (por si las necesitas más adelante)
        setFilteredConvocatorias(convocatoriasAbiertas); // Guardar solo las convocatorias abiertas
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchConvocatorias();
  }, []);
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // Si el término de búsqueda está vacío, mostrar todas las convocatorias
      setFilteredConvocatorias(convocatorias);
    } else {
      // Si hay un término de búsqueda, filtrar las convocatorias
      const searchLower = searchTerm.toLowerCase();

      const filtered = convocatorias.filter(
        (convocatoria) =>
          (convocatoria.titulo && convocatoria.titulo.toLowerCase().includes(searchLower)) ||
          (convocatoria.perfil && convocatoria.perfil.toLowerCase().includes(searchLower)) ||
          (convocatoria.requisitos && convocatoria.requisitos.toLowerCase().includes(searchLower))
      );

      setFilteredConvocatorias(filtered);
    }
  };
  const handleStatusChange = (status) => {
    setStatusFilter(status); // Actualizar el estado del filtro

    let filtered = convocatorias; // Usar la lista completa de convocatorias

    // Aplicar el filtro de estado
    if (status === "abierta" || status === "cerrada") {
      filtered = filtered.filter(
        (convocatoria) => convocatoria.estado.toLowerCase() === status.toLowerCase()
      );
    }
    setFilteredConvocatorias(filtered); // Actualizar las convocatorias filtradas
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleEditarConvocatoria = (idConvocatoria) => {
    const convocatoria = convocatorias.find((c) => c.idConvocatoria === idConvocatoria);
    if (convocatoria) {
      setConvocatoriaToEdit(convocatoria);
      setIsModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConvocatoriaToEdit(null); // Reseteamos convocatoriaToEdit cuando se cierra el modal
  };
  const handleAbrirConvocatoria = (idConvocatoria) => {
    const convocatoria = convocatorias.find((c) => c.idConvocatoria === idConvocatoria);
    if (convocatoria) {
      setConvocatoriaSeleccionada(convocatoria);
    }
  };

  const handleVolver = () => {
    setConvocatoriaSeleccionada(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="docente-search-container">
      {convocatoriaSeleccionada ? (
        <ResultadosPostulantes 
          postulantes={convocatoriaSeleccionada.postulantes} 
          onVolver={handleVolver} 
        />
      ) : (
        <>
         <div className="filters-container">
            <ConvocatoriaFilter onSearch={handleSearch} />
            <label htmlFor="estado-select">Buscar por estado</label>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="abierta">Abierta</option>
              <option value="cerrada">Cerrada</option>
            </select>
            <button className="v-btn" onClick={() => setIsModalOpen(true)}>
              Crear
            </button>
          </div>
          <div className="results-container">
            {filteredConvocatorias.length > 0 ? (
              filteredConvocatorias.map((convocatoria) => (
                <ResultadosConvocatorias
                  key={convocatoria.idConvocatoria}
                  idConvocatoria={convocatoria.idConvocatoria}
                  titulo={convocatoria.titulo}
                  perfil={convocatoria.perfil}
                  requisitos={convocatoria.requisitos}
                  fechaInicio={convocatoria.fechaInicio}
                  totalPostulantes={convocatoria.totalPostulantes}
                  link={convocatoria.link}
                  estadoInicial={convocatoria.estado}
                  onAbrir={handleAbrirConvocatoria}
                  onEditar={handleEditarConvocatoria} // Pasamos la función aquí
                />
              ))
            ) : (
              <p className="no-results">No se encontraron resultados.</p>
            )}
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={convocatoriaToEdit ? "Editar Convocatoria" : "Crear Convocatoria"}>
  <FormularioConvocatoria onClose={handleCloseModal} convocatoriaToEdit={convocatoriaToEdit} />
</Modal>
    </div>
  );
};
