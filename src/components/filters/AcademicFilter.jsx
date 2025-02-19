import { useState } from "react";
import { infoAcademicos } from "../../api/infoAcademicos";

export const AcademicFilter = () => {
  const [selectAcademico, setSelectAcademico] = useState(null);
  const handleChange = (event) => {
    const selectedName = event.target.value;
    const academicoEcontrado = infoAcademicos.find(
      (academic) => academic.nombres === selectedName
    );

    setSelectAcademico(academicoEcontrado);
  };
  return (
    <div className="v-row">
      <h3>Coordinador</h3>
      <div className="v-container v-locale--is-ltr">
        <label className="v-label">
          Nota: Ingrese el nombre del coordinador/a
        </label>
        <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-text-field">
          <div className="v-input__control">
            <div className="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
              <div className="v-field__overlay"></div>
              <div className="v-field__loader">
                <div
                  className="v-progress-linear v-theme--light v-locale--is-ltr"
                  role="progressbar"
                  aria-hidden="true"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    top: "0px",
                    height: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    className="v-progress-linear__background"
                    style={{ width: "100%" }}
                  ></div>
                  <div className="v-progress-linear__indeterminate">
                    <div className="v-progress-linear__indeterminate long"></div>
                    <div className="v-progress-linear__indeterminate short"></div>
                  </div>
                </div>
              </div>
              <div className="v-field__field" data-no-activator="">
                <label className="v-label v-field-label" htmlFor="input-16">
                  Nombre
                </label>
                <select
                  onChange={handleChange}
                  name="nombre_coordinador"
                  id="input-16"
                >
                  <option value="">Seleccionar</option>
                  {infoAcademicos.map((academico) => (
                    <option key={academico.id} value={academico.nombres}>
                      {academico.nombres}
                    </option>
                  ))}
                </select>
              </div>
              <div className="v-field__outline">
                <div className="v-field__outline__start"></div>

                <div className="v-field__outline__end"></div>
              </div>
            </div>
          </div>
          <div className="v-input__details">
            <div
              className="v-messages"
              role="alert"
              aria-live="polite"
              id="input-16-messages"
            ></div>
          </div>
        </div>
        {selectAcademico && (
          <div>
            <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-text-field">
              <div className="v-input__control">
                <div className="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                  <div className="v-field__overlay"></div>
                  <div className="v-field__loader">
                    <div
                      className="v-progress-linear v-theme--light v-locale--is-ltr"
                      role="progressbar"
                      aria-hidden="true"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        top: "0px",
                        height: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div
                        className="v-progress-linear__background"
                        style={{ width: "100%" }}
                      ></div>
                      <div className="v-progress-linear__indeterminate">
                        <div className="v-progress-linear__indeterminate long"></div>
                        <div className="v-progress-linear__indeterminate short"></div>
                      </div>
                    </div>
                  </div>
                  <div className="v-field__field" data-no-activator="">
                    <label className="v-label v-field-label" htmlFor="input-18">
                      Nombres
                    </label>
                    <input
                      size="1"
                      type="text"
                      id="input-18"
                      aria-describedby="input-18-messages"
                      required=""
                      className="v-field__input"
                      value={selectAcademico.nombres}
                    />
                  </div>
                  <div className="v-field__outline">
                    <div className="v-field__outline__start"></div>
                    <div className="v-field__outline__notch">
                      <label
                        className="v-label v-field-label v-field-label--floating"
                        aria-hidden="true"
                        htmlFor="input-18"
                      >
                        Nombres
                      </label>
                    </div>
                    <div className="v-field__outline__end"></div>
                  </div>
                </div>
              </div>
              <div className="v-input__details">
                <div
                  className="v-messages"
                  role="alert"
                  aria-live="polite"
                  id="input-18-messages"
                ></div>
              </div>
            </div>
            <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-text-field">
              <div className="v-input__control">
                <div className="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                  <div className="v-field__overlay"></div>
                  <div className="v-field__loader">
                    <div
                      className="v-progress-linear v-theme--light v-locale--is-ltr"
                      role="progressbar"
                      aria-hidden="true"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        top: "0px",
                        height: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div
                        className="v-progress-linear__background"
                        style={{ width: "100%" }}
                      ></div>
                      <div className="v-progress-linear__indeterminate">
                        <div className="v-progress-linear__indeterminate long"></div>
                        <div className="v-progress-linear__indeterminate short"></div>
                      </div>
                    </div>
                  </div>
                  <div className="v-field__field" data-no-activator="">
                    <label className="v-label v-field-label" htmlFor="input-20">
                      Apellidos
                    </label>
                    <input
                      size="1"
                      type="text"
                      id="input-20"
                      aria-describedby="input-20-messages"
                      required=""
                      className="v-field__input"
                      value={selectAcademico.apellido_paterno}
                    />
                  </div>
                  <div className="v-field__outline">
                    <div className="v-field__outline__start"></div>
                    <div className="v-field__outline__notch">
                      <label
                        className="v-label v-field-label v-field-label--floating"
                        aria-hidden="true"
                        htmlFor="input-20"
                      >
                        Apellidos
                      </label>
                    </div>
                    <div className="v-field__outline__end"></div>
                  </div>
                </div>
              </div>
              <div className="v-input__details">
                <div
                  className="v-messages"
                  role="alert"
                  aria-live="polite"
                  id="input-20-messages"
                ></div>
              </div>
            </div>
            <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-text-field">
              <div className="v-input__control">
                <div className="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                  <div className="v-field__overlay"></div>
                  <div className="v-field__loader">
                    <div
                      className="v-progress-linear v-theme--light v-locale--is-ltr"
                      role="progressbar"
                      aria-hidden="true"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        top: "0px",
                        height: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div
                        className="v-progress-linear__background"
                        style={{ width: "100%" }}
                      ></div>
                      <div className="v-progress-linear__indeterminate">
                        <div className="v-progress-linear__indeterminate long"></div>
                        <div className="v-progress-linear__indeterminate short"></div>
                      </div>
                    </div>
                  </div>
                  <div className="v-field__field" data-no-activator="">
                    <label className="v-label v-field-label" htmlFor="input-20">
                      Correo
                    </label>
                    <input
                      size="1"
                      type="text"
                      id="input-20"
                      aria-describedby="input-20-messages"
                      required=""
                      className="v-field__input"
                      value={selectAcademico.correo}
                    />
                  </div>
                  <div className="v-field__outline">
                    <div className="v-field__outline__start"></div>
                    <div className="v-field__outline__notch">
                      <label
                        className="v-label v-field-label v-field-label--floating"
                        aria-hidden="true"
                        htmlFor="input-20"
                      >
                        Correo
                      </label>
                    </div>
                    <div className="v-field__outline__end"></div>
                  </div>
                </div>
              </div>
              <div className="v-input__details">
                <div
                  className="v-messages"
                  role="alert"
                  aria-live="polite"
                  id="input-20-messages"
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
