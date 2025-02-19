import { useState } from "react";

export const DecisionComponent = () => {
  // Estado que guarda la elección (por defecto es "No")
  const [choice, setChoice] = useState("No");
  // Estado que guarda el valor del campo de texto
  const [inputValue, setInputValue] = useState("");

  // Manejar el cambio de elección
  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
    if (event.target.value === "No") {
      setInputValue(""); // Reiniciar campo de texto si la elección es "No"
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h3>complemento</h3>
      <label>
        <input
          type="radio"
          value="Sí"
          checked={choice === "Sí"}
          onChange={handleChoiceChange}
        />
        Sí
      </label>
      <label>
        <input
          type="radio"
          value="No"
          checked={choice === "No"}
          onChange={handleChoiceChange}
        />
        No
      </label>

      {choice === "Sí" && (
        <input
          name="complemento"
          type="text"
          placeholder="Ingresa el complemento"
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};
