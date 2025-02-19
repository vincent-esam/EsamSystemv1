import React from "react";
import "../../styles/docenteSearch.css";

interface ResultProps {
  idDocente:number;
  nombres: string;
  correo: string;
  numeroDocumento: string;
  telefono: string;
}

export const ResultadosDocentes: React.FC<ResultProps> = ({
  idDocente,
  nombres,
  correo,
  numeroDocumento,
  telefono, 
}) => {
  
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
        {/* Aquí mostramos los datos del docente */}
        <div className="v-card-content">
          <div className="v-card-title sub-title">{nombres}</div>
          <div className="v-card-subtitle">
            <p>
              <strong>Correo:</strong> {correo}
            </p><br />
            <p>
              <strong>CI:</strong> {numeroDocumento}
            </p><br />
            <p>
              <strong>Teléfono:</strong> {telefono}
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
            <a href={`/postulantes/info/info-postulante?idDocente=${idDocente}`}>ABRIR</a>
          </button>
        </div>
      </div>
    </div>
  );
};
