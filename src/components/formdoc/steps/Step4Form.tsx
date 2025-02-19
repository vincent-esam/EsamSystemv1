import React, { useState } from "react";

// Componente para un formulario individual de curso
interface CourseFormProps {
  index: number;
  onDelete: () => void;
  isDisabled: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({
  index,
  onDelete,
  isDisabled,
}) => {
  return (
    <div className="course-form">
      <h1 style={{ color: "black" }}>CURSOS</h1>
      <h3>CURSO {index + 1}</h3>
      <p>
        Llene el formulario con los cursos realizados más relevantes para el
        cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y
        verifica la ortografía.
      </p>
      <input
        name="universidadCurso"
        id="universidadCurso"
        type="text"
        placeholder="Universidad o Institución"
        required
        disabled={isDisabled}
      />
      <input
        name="nombreCurso"
        id="nombreCurso"
        type="text"
        placeholder="Nombre del Curso o Taller"
        required
        disabled={isDisabled}
      />
      <input
        name="paisCurso"
        id="paisCurso"
        type="text"
        placeholder="País"
        required
        disabled={isDisabled}
      />
      <input
        name="fechaCurso"
        id="fechaCurso"
        type="date"
        placeholder="Fecha del Curso"
        required
        disabled={isDisabled}
      />
      <button type="button" onClick={onDelete} disabled={isDisabled}>
        Eliminar
      </button>
    </div>
  );
};

// Componente que maneja la lista de formularios de cursos
const CourseFormList: React.FC = () => {
  const [courseForms, setCourseForms] = useState<number[]>([0]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  // Función para agregar un nuevo formulario
  const addCourseForm = () => {
    setCourseForms([...courseForms, courseForms.length]);
  };

  // Función para eliminar un formulario por índice
  const deleteCourseForm = (index: number) => {
    setCourseForms(courseForms.filter((_, i) => i !== index));
  };

  // Función para bloquear/desbloquear los formularios
  const handleNoCourses = () => {
    setIsFormDisabled(!isFormDisabled); // Alterna entre bloquear y desbloquear
  };

  return (
    <div>
      <button type="button" onClick={handleNoCourses}>
        {isFormDisabled ? "Tengo Cursos" : "No cuento con cursos"}
      </button>
      {courseForms.map((_, index) => (
        <CourseForm
          key={index}
          index={index}
          onDelete={() => deleteCourseForm(index)}
          isDisabled={isFormDisabled}
        />
      ))}
      <button type="button" onClick={addCourseForm} disabled={isFormDisabled}>
        Agregar Nuevo Curso
      </button>
    </div>
  );
};

export default CourseFormList;
