import { useState } from "react";
import { gql, request } from "graphql-request";

const GET_PROGRAM_BY_ID = gql`
  query GetProgramById($id: Int!) {
    programa(id: $id) {
      id
      nombre_compuesto
      fecha_inicio
      fecha_fin
      sede {
        nombre
      }
      postgrado {
        area {
          nombre
        }
      }
    }
  }
`;

export const ProgramForm = () => {
  const [programId, setProgramId] = useState("");
  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProgramData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await request(
        "https://webapitest.esam.edu.bo/graphql",
        GET_PROGRAM_BY_ID,
        { id: parseInt(id) }
      );
      setProgramData(data.programa);
    } catch (err) {
      setError("Error al obtener el programa");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (programId) {
      fetchProgramData(programId);
    }
  };

  return (
    <div>
      <h2>Buscar Programa por ID</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="programId">ID del Programa:</label>
        <input
          type="text"
          id="programId"
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          placeholder="Ingresa el ID del programa"
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {programData && (
        <div>
          <h3>Datos del Programa:</h3>
          <p>
            <strong>Nombre:</strong> {programData.nombre_compuesto}
          </p>
          <p>
            <strong>Fecha de Inicio:</strong> {programData.fecha_inicio}
          </p>
          <p>
            <strong>Fecha de Fin:</strong> {programData.fecha_fin}
          </p>
          <p>
            <strong>Sede:</strong> {programData.sede.nombre}
          </p>
          <p>
            <strong>Área de Postgrado:</strong>{" "}
            {programData.postgrado.area.nombre}
          </p>
        </div>
      )}
    </div>
  );
};
