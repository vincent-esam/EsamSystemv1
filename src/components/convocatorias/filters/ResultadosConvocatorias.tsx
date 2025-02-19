import React, { useState } from "react";
import { MoreVertical, Pencil, CheckCircle } from "lucide-react";
import "../../../styles/docenteSearch.css";

interface ResultProps {
  idConvocatoria: number;
  titulo: string;
  perfil: string;
  requisitos: string;
  fechaInicio: string;
  totalPostulantes: number;
  link: string;
  estadoInicial: string;
  onAbrir: (id: number) => void;
  onEditar: (id: number) => void;
}

export const ResultadosConvocatorias: React.FC<ResultProps> = ({
  idConvocatoria,
  titulo,
  perfil,
  requisitos,
  fechaInicio,
  totalPostulantes,
  link,
  estadoInicial,
  onAbrir,
  onEditar,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [estado, setEstado] = useState(estadoInicial);

  // Función para copiar el link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Función para alternar opciones del menú
  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  // Función para finalizar convocatoria
  const handleFinalizar = async () => {
    const nuevoEstado = estado === "abierta" ? "cerrada" : "abierta";
    setEstado(nuevoEstado);

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
      setEstado(estado); // Revertir en caso de error
    }
  };

  return (
    <div className="v-card v-theme--light v-card--density-default v-card--variant-elevated mb-4">
      <div className="v-card__loader">
        <div
          className="v-progress-linear v-theme--light v-locale--is-ltr"
          role="progressbar"
          aria-hidden="true"
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            top: "0px",
            height: "0px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="v-progress-linear__background"
            style={{ width: "100%" }}
          ></div>
          <div className="v-progress-linear__indeterminate">
            <div className="v-progress-linear__indeterminate long"></div>
            <div className="v-progress-linear__indeterminate short"></div>
          </div>
        </div>
      </div>

      <div className="result-item">
        {/* Menú de opciones con tres puntos */}
        <div className="menu-container">
          <button onClick={toggleOpciones} className="menu-button">
            <MoreVertical size={24} />
          </button>

          {mostrarOpciones && (
            <div className="menu-options">
              <button className="option-button" onClick={() => onEditar(idConvocatoria)}>
  <Pencil size={18} /> Editar
</button>
              <button className="option-button" onClick={handleFinalizar}>
                <CheckCircle size={18} color={estado === "cerrada" ? "gray" : "green"} />
                {estado === "cerrada" ? "Reabrir" : "Finalizar"}
              </button>
            </div>
          )}
        </div>

        {/* Información de la convocatoria */}
        <div className="v-card-content">
          <div className="v-card-title sub-title">{titulo}</div>
          <div className="v-card-subtitle">
            <p><strong>Perfil:</strong> {perfil}</p><br />
            <p><strong>Requisitos:</strong> {requisitos}</p><br />
            <p><strong>Fecha Inicio:</strong> {fechaInicio}</p><br />
            <p><strong>Total Postulantes:</strong> {totalPostulantes}</p><br />
            <p><strong>Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p><br />
            <button className="copy-button" onClick={handleCopyLink}>
              📋 Copiar Link
            </button>
            {copiado && <span className="copy-message">¡Copiado!</span>}
          </div>
        </div>

        <div className="v-card-actions">
          <button
            type="button"
            className="v-btn v-btn--slim v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text button-card"
            onClick={() => onAbrir(idConvocatoria)}
          >
            <span className="v-btn__overlay"></span>
            <span className="v-btn__underlay"></span>
            <a>ABRIR</a>
          </button>
        </div>
      </div>
    </div>
  );
};
