import { useState } from "react";

export const DocenteFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Único término de búsqueda

  const handleSearch = () => {
    onSearch(searchTerm); // Llamar a la función de búsqueda con el término
  };

  return (
    <div className="v-row">
      <div className="v-col">
        <div className="v-input v-input--horizontal">
          <div className="v-input__control">
            <div className="v-field">
              <label htmlFor="search-input">Ingrese datos a buscar</label>
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="v-field__input"
              />
            </div>
          </div>
        </div>

        <button type="button" onClick={handleSearch} className="v-btn">
          Buscar
        </button>
      </div>
    </div>
  );
};
