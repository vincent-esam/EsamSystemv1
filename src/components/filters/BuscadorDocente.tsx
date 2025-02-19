import React from "react";

interface BuscadorDocentesProps {
  idDocente: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BuscadorDocentes: React.FC<BuscadorDocentesProps> = ({ idDocente,label, value, onChange }) => {
  return (
    <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-text-field">
      <div className="v-input__control">
        <div className="v-field v-field--active v-field--center-affix v-field--variant-filled v-theme--light v-locale--is-ltr">
          <div className="v-field__field" data-no-activator="">
            <label className="v-label v-field-label" htmlFor={idDocente}>
              {label}
            </label>
            <input
              type="text"
              id={idDocente}
              value={value}
              onChange={onChange}
              className="v-field__input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
