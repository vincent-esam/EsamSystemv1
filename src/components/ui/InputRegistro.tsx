
import React from 'react';
  // Importamos el archivo CSS

// Si estás usando TypeScript (.tsx), puedes declarar la interfaz Props
interface Props {
  info: string;
  name: string;
  id: string;
}

export const InputRegistro = ({ info, name, id }: Props) => {
  return (
    <div className="input-registro-container"> {/* Usamos la clase aquí */}
      <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-text-field">
        <div className="v-input__control">
          <div className="v-field v-field--center-affix v-field--variant-filled">
            <label className="v-label v-field-label" htmlFor={id}>
              {info}
            </label>
            <input
              type="text"
              id={id}
              placeholder={info}
              className="v-field__input"
              name={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
