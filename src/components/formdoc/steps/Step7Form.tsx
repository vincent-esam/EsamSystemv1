// WorkExperienceFormList.tsx
import React, { useState } from "react";
import { infoTitu, gradoAcadem } from "../../../api/infoModalidad";
import  "../style/step7.css";
// Componente para un formulario individual de experiencia laboral
interface WorkExperienceFormProps {
  index: number;
  onDelete: () => void;
  isDisabled: boolean;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  index,
  onDelete,
  isDisabled,
}) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCurrentJobToggle = () => {
    setIsCurrentJob(!isCurrentJob);
    if (!isCurrentJob) {
      setEndDate(""); // Limpiar la fecha de fin si es trabajo actual
    }
  };

  return (
    <div className="work-experience-form">
      <h1 style={{ color: "black" }}>Experiencia Como docente</h1>
      <h3 style={{ color: "black" }}>Experiencia Docente {index + 1}</h3>
      <p>
        Llene el formulario con los cargos más relevantes ocupados.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y
        verifica la ortografía.
      </p>

      <input
        name="universidadDocente"
        id="universidadDocente"
        type="text"
        placeholder="Universidad o Institución"
        required
        disabled={isDisabled}
      />
      <input
        name="materia"
        id="materia"
        type="text"
        placeholder="Materia Impartida"
        required
        disabled={isDisabled}
      />
      <input
        name="paisDocente"
        id="paisDocente"
        type="text"
        placeholder="País"
        required
        disabled={isDisabled}
      />
      <select name="calidadDocente" id="calidadDocente">
        <option value="">En calidad de:</option>
        {infoTitu.map((info) => (
          <option value={info.mod} key={info.mod}>
            {info.mod}
          </option>
        ))}
      </select>

      <select name="gradoImpartio" id="gradoImpartio">
        <option value="">Grado Academco que impartio</option>
        {gradoAcadem.map((grad) => (
          <option value={grad.mod} key={grad.mod}>
            {grad.mod}
          </option>
        ))}
      </select>

      <label htmlFor="fechaDocenteDesde">Fecha de inicio:</label>
      <input
        name="fechaDocenteDesde"
        id="fechaDocenteDesde"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        disabled={isDisabled}
      />

      {!isCurrentJob && (
        <>
          <label htmlFor="fechaDocenteHasta">Fecha de fin:</label>
          <input
            name="fechaDocenteHasta"
            id="fechaDocenteHasta"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            disabled={isDisabled}
          />
        </>
      )}

      <button
        type="button"
        onClick={handleCurrentJobToggle}
        disabled={isDisabled}
      >
        {isCurrentJob ? "Trabajo Actual (Desmarcar)" : "Trabajo Actual"}
      </button>

      <button type="button" onClick={onDelete} disabled={isDisabled}>
        Eliminar
      </button>
    </div>
  );
};

// Componente que maneja la lista de formularios de experiencias laborales
const WorkExperienceFormList: React.FC = () => {
  const [courseForms, setCourseForms] = useState<number[]>([0]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const addCourseForm = () => {
    setCourseForms([...courseForms, courseForms.length]);
  };

  const deleteCourseForm = (index: number) => {
    setCourseForms(courseForms.filter((_, i) => i !== index));
  };

  const handleNoCourses = () => {
    setIsFormDisabled(!isFormDisabled); // Alterna entre bloquear y desbloquear
  };

  return (
    <div className="work-experience-list">
      <button type="button" onClick={handleNoCourses}>
        {isFormDisabled ? "Tengo experiencia" : "No cuento con experiencia"}
      </button>
      {courseForms.map((_, index) => (
        <WorkExperienceForm
          key={index}
          index={index}
          onDelete={() => deleteCourseForm(index)}
          isDisabled={isFormDisabled}
        />
      ))}
      <button type="button" onClick={addCourseForm} disabled={isFormDisabled}>
        Agregar nueva experiencia Docente
      </button>
    </div>
  );
};

export default WorkExperienceFormList;
