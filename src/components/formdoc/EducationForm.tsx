
// src/components/EducationForm.tsx
import React, { useState } from 'react';
import './style/Education.css'

interface EducationFormProps {
  title: string;
  FormComponent: React.FC<{ index: number; onDelete: () => void }>;
}

const EducationForm: React.FC<EducationFormProps> = ({
  title,
  FormComponent,
}) => {
  const [degreeForms, setDegreeForms] = useState<number[]>([0]);

  const addDegreeForm = () => {
    setDegreeForms([...degreeForms, degreeForms.length]);
  };

  const deleteDegreeForm = (index: number) => {
    setDegreeForms(degreeForms.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>{title}</h1>
      {degreeForms.map((_, index) => (
        <FormComponent
          key={index}
          index={index}
          onDelete={() => deleteDegreeForm(index)}
        />
      ))}
      <button className='button-agr' onClick={addDegreeForm}>Agregar Formación</button>
    </div>
  );
};

export default EducationForm;
