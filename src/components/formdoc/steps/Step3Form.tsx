import React, { useState } from "react";

interface EducationFormProps {
  title: string;
  FormComponent: React.FC<{ index: number; onDelete: () => void }>;
}

export const Step3Form: React.FC<EducationFormProps> = ({
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
      <button onClick={addDegreeForm}>Agregar Formación</button>
    </div>
  );
};
