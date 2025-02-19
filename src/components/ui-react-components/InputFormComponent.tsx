import React, { useState } from "react";
import { GET_PROGRAM_BY_ID } from "../../api/graphqlqueries";
import {request} from "graphql-request";

const endpoint = "https://webapitest.esam.edu.bo/graphql";

interface InputFormProps {
  title: string;
  message: string;
  placeholder: string;
};
// Definir la estructura de los datos esperados
interface Program {
  id: number;
  nombre_compuesto: string;
  fecha_inicio: string;
  fecha_fin: string;
  sede:{nombre: string};
  postgrado:{area:{nombre: string;}}
};

export const InputFormComponent: React.FC<InputFormProps> = ({
  title,
  message,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [fetchProgramData, setFetchProgramData] = useState<any>(null);

  // Manejar cambios en el input
  const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Función para hacer la solicitud de datos
  const fetchProgramDataFunction = async () => {
    const variables = {id:setInputValue}
    try {
      const program: Program = await request(endpoint, GET_PROGRAM_BY_ID, variables);
      setFetchProgramData(program);
      console.log(program.nombre_compuesto )
    } catch (error) {
      console.error('Error fetching data from GraphQL:', error);
      return null;
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <span>{message}</span>
      <br />
      <label htmlFor="programInput">Código:</label>
      <input
        id="programInput"
        onChange={handleInputValueChange}
        value={inputValue}
        placeholder={placeholder}
      />
      <br />
      <button onClick={fetchProgramDataFunction}>Buscar Programa</button>
      <span>Resultado:</span>
      {fetchProgramData && (
        <div>
          <h4>Resultados:</h4>
          <pre>{JSON.stringify(fetchProgramData.nombre_compuesto)}</pre>
        </div>
      )}
    </div>
  );
};
