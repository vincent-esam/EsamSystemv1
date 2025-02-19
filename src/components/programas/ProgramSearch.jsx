import React, { useState } from "react";
import { infoProgramas } from "../../api/infoModulosPrueba";
export const ProgramSearch = () => {
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  const handleProgramClick = (id) => {
    setSelectedProgramId(id === selectedProgramId ? null : id);
  };

  return (
    <div>
      {infoProgramas.map((programa) => (
        <div key={programa.id_programa}>
          <h2 onClick={() => handleProgramClick(programa.id_programa)}>
            {`ID Programa: ${programa.id_programa}`}
          </h2>

          {selectedProgramId === programa.id_programa && (
            <div>
              {programa.modulos.map((modulo) => (
                <div key={modulo.id}>
                  <p>{`Módulo: ${modulo.nombre}`}</p>
                  <button
                    type="button"
                    className="v-btn v-btn--slim v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text button-card"
                  >
                    <span className="v-btn__overlay"></span>
                    <span className="v-btn__underlay"></span>
                    <a href={`/programas/${programa.id_programa}/${modulo.id}`}>
                      Invitación
                    </a>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
