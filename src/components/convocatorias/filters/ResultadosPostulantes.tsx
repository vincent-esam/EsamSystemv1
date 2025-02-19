import "../../../styles/docenteSearch.css";

// Definir la interfaz para los postulantes
interface Postulante {
  idDocente: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaPostulacion: string;
}

// Definir la interfaz para las props del componente
interface ResultadosPostulantesProps {
  postulantes: Postulante[];
  onVolver: () => void;
}

export const ResultadosPostulantes: React.FC<ResultadosPostulantesProps> = ({
  postulantes,
  onVolver,
}) => {
  return (
    <div className="results-container">
      <h2>Postulantes</h2>
      <button
        type="button"
        className="v-btn v-btn--slim v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text button-card"
        onClick={onVolver}
      >
        <span className="v-btn__overlay"></span>
        <span className="v-btn__underlay"></span>
        <a>Volver</a>
      </button>

      {postulantes.length > 0 ? (
        postulantes.map((postulante) => (
          <div
            key={postulante.idDocente}
            className="v-card v-theme--light v-card--variant-elevated mb-4"
          >
            <div className="result-item">
              <div className="v-card-content">
                <div className="v-card-title sub-title">
                  {postulante.nombre} {postulante.apellidoPaterno}{" "}
                  {postulante.apellidoMaterno}
                </div>
                <div className="v-card-subtitle">
                  <p>
                    <strong>Fecha de Postulación:</strong>{" "}
                    {postulante.fechaPostulacion}
                  </p>
                </div>
              </div>
              <div className="v-card-actions">
                <button
                  type="button"
                  className="v-btn v-btn--slim v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text button-card"
                >
                  <span className="v-btn__overlay"></span>
                  <span className="v-btn__underlay"></span>
                  <a href={`/postulantes/info/${postulante.idDocente}`}>ABRIR</a>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-results">No hay postulantes para esta convocatoria.</p>
      )}
    </div>
  );
};
