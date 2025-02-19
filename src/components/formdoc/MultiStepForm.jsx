import { useState } from "react";
import { Step1Form } from "./steps/Step1Form";
import { Step2Form } from "./steps/Step2Form";
import { Step3Form } from "./steps/Step3Form";
import { DegreeForm } from "./DegreeForm";
import { PostDegreeForm } from "./PostDegreeForm";
import CourseFormList from "./steps/Step4Form";
import IntellectualProductionFormList from "./steps/Step5Form";
import WorkExperienceFormList from "./steps/Step6Form";
import Step7Form from "./steps/Step7Form";
import { Step8Form } from "./steps/Step8Form";

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <Step1Form />,
    <Step2Form />,
    <Step3Form title="Formación Pregrado" FormComponent={DegreeForm} />,
    <Step3Form title="Formación Postgrado" FormComponent={PostDegreeForm} />,
    <CourseFormList />,
    <IntellectualProductionFormList />,
    <WorkExperienceFormList />,
    <Step7Form />,
    <Step8Form />,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <form
      action="../../backend/insertar_docente.php"
      method="post"
      encType="multipart/form-data"
    >
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: index === currentStep ? "block" : "none",
            opacity: index === currentStep ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {step}
        </div>
      ))}
      <div>
        {currentStep > 0 && (
          <button type="button" onClick={handleBack}>
            Atrás
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button type="button" onClick={handleNext}>
            Siguiente
          </button>
        ) : (
          <button type="submit">Enviar</button>
        )}
      </div>
    </form>
  );
};
