import React from "react";
import { infoGrado, infoModalidad } from "../../api/infoModalidad";
import './style/DegreeForm.css';
interface DegreeFormProps {
  index: number;
  onDelete: () => void;
}

export const DegreeForm: React.FC<DegreeFormProps> = ({ onDelete }) => {
  return (
    <div className="degree-form">
      <p>
        Llene el formulario con los títulos más relevantes para el cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y
        verifica la ortografía.
      </p>

      <input
        name="universidadPregrado"
        id="universidadPregrado"
        type="text"
        placeholder="Universidad o Institución"
        required
      />
      <input
        name="carreraPregrado"
        id="carreraPregrado"
        type="text"
        placeholder="Carrera"
        required
      />

      <div className="v-col">
        <select name="gradoPregrado" id="gradoPregrado">
          <option value="">Grado</option>
          {infoGrado.map((grado) => (
            <option value={grado.grado} key={grado.grado}>
              {grado.grado}
            </option>
          ))}
        </select>
      </div>

      <input
        name="titulacionPregrado"
        id="titulacionPregrado"
        type="date"
        placeholder="Año de Titulación"
        required
      />

      <select name="modalidadPregrado" id="modalidadPregrado">
        <option value="">Modalidad de graduación</option>
        {infoModalidad.map((modalidad) => (
          <option value={modalidad.mod} key={modalidad.mod}>
            {modalidad.mod}
          </option>
        ))}
      </select>
      <button type="button" onClick={onDelete}>
        Eliminar
      </button>
    </div>
  );
};
