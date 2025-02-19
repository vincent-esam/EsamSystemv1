import React, { useState } from 'react';

// Componente para un formulario individual de producción intelectual
interface IntellectualProductionFormProps {
  index: number;
  onDelete: () => void;
  isDisabled: boolean;
}

const IntellectualProductionForm: React.FC<IntellectualProductionFormProps> = ({ index, onDelete, isDisabled }) => {
  return (
    <div className="intellectual-production-form">
       <h1 style={{ color: 'black' }}>Publicaciones</h1>
      <h3>PUBLICACIÓN {index + 1}</h3>
      <p>
        Llene el formulario con los artículos realizados más relevantes para el cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
      </p>
      <input type="text" placeholder="Nombre de Publicación" required disabled={isDisabled} />
      <input type="text" placeholder="Enlace o Editorial de Publicación" required disabled={isDisabled} />
      <select required disabled={isDisabled}>
        <option value="">Tipo de Publicación</option>
        <option value="revista">Revista</option>
        <option value="libro">Libro</option>
        <option value="articulo">Artículo</option>
      </select>
      <input type="text" placeholder="País" required disabled={isDisabled} />
      <input type="date" placeholder="Fecha de Publicación" required disabled={isDisabled} />
      <button type="button" onClick={onDelete} disabled={isDisabled}>Eliminar</button>
    </div>
  );
};

// Componente que maneja la lista de formularios de producción intelectual
const IntellectualProductionFormList: React.FC = () => {
  const [productionForms, setProductionForms] = useState<number[]>([0]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  // Función para agregar un nuevo formulario
  const addProductionForm = () => {
    setProductionForms([...productionForms, productionForms.length]);
  };

  // Función para eliminar un formulario por índice
  const deleteProductionForm = (index: number) => {
    setProductionForms(productionForms.filter((_, i) => i !== index));
  };

  // Función para bloquear/desbloquear los formularios
  const handleNoProductions = () => {
    setIsFormDisabled(!isFormDisabled); // Alterna entre bloquear y desbloquear
  };

  return (
    <div>
      <button type="button" onClick={handleNoProductions}>
        {isFormDisabled ? 'Tengo Publicaciones' : 'No cuento con publicaciones'}
      </button>
      {productionForms.map((_, index) => (
        <IntellectualProductionForm
          key={index}
          index={index}
          onDelete={() => deleteProductionForm(index)}
          isDisabled={isFormDisabled}
        />
      ))}
      <button type="button" onClick={addProductionForm} disabled={isFormDisabled}>
        Agregar Nueva Publicación
      </button>
    </div>
  );
};

export default IntellectualProductionFormList;
