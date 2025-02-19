import React, { useState } from "react";
import "../style/step6.css";
// Componente para un formulario individual de experiencia laboral
interface WorkExperienceFormProps {
  index: number;
  onDelete: () => void;
  onChange: (index: number, data: any) => void;
  isDisabled: boolean;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  index,
  onDelete,
  onChange,
  isDisabled,
}) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    onChange(index, { [name]: value });
  };

  const handleCurrentJobToggle = () => {
    setIsCurrentJob(!isCurrentJob);
    onChange(index, { dateLaboralHasta: isCurrentJob ? "" : "Trabajo Actual" });
  };

  return (
    <div className="work-experience-form">
    <h1>Experiencia Laboral</h1>
    <h3>Experiencia Laboral últimos 3 años {index + 1}</h3>
  
    <input
      className="input-field"
      name="empresaLaboral"
      type="text"
      placeholder="Nombre de Empresa o Institución"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <input
      className="input-field"
      name="cargo"
      type="text"
      placeholder="Cargo"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <input
      className="input-field"
      name="paisLaboral"
      type="text"
      placeholder="País"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
  
    <label>Fecha de inicio:</label>
    <input
      className="input-field"
      name="dateLaboralDesde"
      type="date"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
  
    {!isCurrentJob && (
      <>
        <label>Fecha de fin:</label>
        <input
          className="input-field"
          name="dateLaboralHasta"
          type="date"
          onChange={handleInputChange}
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
  
    <input
      className="input-field"
      name="descripcionLaboral"
      type="text"
      placeholder="Descripcion de funciones realizadas"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
  
    <h1>Referencias</h1>
    <input
      className="input-field"
      name="nombreRef"
      type="text"
      placeholder="Nombre"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <input
      className="input-field"
      name="apellidosRef"
      type="text"
      placeholder="Apellidos"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <input
      className="input-field"
      name="cargoSup"
      type="text"
      placeholder="Cargo de Inmediato Superior"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <input
      className="input-field"
      name="numeroRef"
      type="number"
      placeholder="Número de contacto"
      onChange={handleInputChange}
      required
      disabled={isDisabled}
    />
    <div className="button-group">
      <button type="button" onClick={onDelete} disabled={isDisabled}>
        Eliminar
      </button>
    </div>
  </div>
  
  );
};

// Componente que maneja la lista de formularios de experiencias laborales
const WorkExperienceFormList: React.FC = () => {
  const [workExperiences, setWorkExperiences] = useState<any[]>([{}]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const addWorkExperienceForm = () => {
    setWorkExperiences([...workExperiences, {}]);
  };

  const deleteWorkExperienceForm = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleNoCourses = () => {
    setIsFormDisabled(!isFormDisabled);
  };

  const handleFormChange = (index: number, data: any) => {
    const newExperiences = [...workExperiences];
    newExperiences[index] = { ...newExperiences[index], ...data };
    setWorkExperiences(newExperiences);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("../../../backend/insertar_docente.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experiences: workExperiences }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="work-experience-list">
  <button type="button" onClick={handleNoCourses}>
    {isFormDisabled ? "Tengo experiencia" : "No cuento con experiencia"}
  </button>
  {workExperiences.map((_, index) => (
    <WorkExperienceForm
      key={index}
      index={index}
      onDelete={() => deleteWorkExperienceForm(index)}
      onChange={handleFormChange}
      isDisabled={isFormDisabled}
    />
  ))}
  <button
    className="add-button"
    type="button"
    onClick={addWorkExperienceForm}
    disabled={isFormDisabled}
  >
    Agregar nueva experiencia Laboral
  </button>
  <button
    className="submit-button"
    type="button"
    onClick={handleSubmit}
    disabled={isFormDisabled}
  >
    Enviar Experiencia Laboral
  </button>
</div>
  );
};

export default WorkExperienceFormList;
