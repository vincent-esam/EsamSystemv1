import { useState } from "react";
import { ImageUpload } from "../upload/Uploadimages";
import { CountriesFormSelect } from "../ui/CountriesFormSelect";
import { CountryCodeForm } from "../ui/CountryCodeForm";
import { DatePicker } from "../ui/DatePickerForm";
import { AreaForm } from "../ui/AreaForm";

export const SingleForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correoElectronico: "",
    ciudadRadicacion: "",
    pais: "",
    numeroContacto: "",
    fechaNacimiento: "",
    areaInteres: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("../../api/insert_postulante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Datos insertados correctamente");
        setFormData({
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          correoElectronico: "",
          ciudadRadicacion: "",
          pais: "",
          numeroContacto: "",
          fechaNacimiento: "",
          areaInteres: "",
        });
      } else {
        setMessage(result.error || "Error al insertar datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("Error en la conexión al servidor");
    }
  };

  return (
    <div className="page-content ">
      <div className="page-content page-content--index">
        <section className="consultation">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h1 className="title-homepage title-homepage--lg">
                  Formulario Registro Docentes
                </h1>
                <div className="consultation__description">
                  <p className="text-homepage text-homepage--lg">
                    <b>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Similique quibusdam a odit reprehenderit, quam deleniti,
                      suscipit accusamus consequuntur, nulla minima aliquid non
                      optio maxime facilis! Animi consequuntur ipsam voluptates
                      suscipit.
                    </b>
                  </p>
                  <p className="text-homepage text-homepage--sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores nobis ratione enim deleniti molestiae inventore
                    quasi rerum? Quidem, obcaecati a provident illo magnam quod
                    consequuntur, at recusandae itaque nulla eveniet.
                  </p>
                  <br />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <ImageUpload />
                  </div>
                  <div className="form-row">
                    <div className="form-group input__group">
                      <input
                        type="text"
                        name="nombres"
                        id="nombres"
                        className="form-control js-control-input"
                        value={formData.nombres}
                        onChange={handleChange}
                      />
                      <label htmlFor="nombres">Nombres</label>
                      <span className="error-text"></span>
                      <i className="error-icon"></i>
                    </div>
                  </div>
                  <div className="form-row row">
                    <div className="form-group col-md-6 col-sm-12 input__group">
                      <input
                        type="text"
                        name="apellidoPaterno"
                        id="apellidoPaterno"
                        className="form-control js-control-input"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                      />
                      <label htmlFor="apellidoPaterno">Apellido paterno</label>
                      <span className="error-text"></span>
                      <i className="error-icon"></i>
                    </div>
                    <div className="form-group col-md-6 col-sm-12 input__group">
                      <input
                        type="text"
                        name="apellidoMaterno"
                        id="apellidoMaterno"
                        className="form-control js-control-input"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                      />
                      <label htmlFor="apellidoMaterno">Apellido Materno</label>
                      <span className="error-text"></span>
                      <i className="error-icon"></i>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group input__group">
                      <input
                        type="email"
                        name="correoElectronico"
                        className="form-control js-control-input"
                        value={formData.correoElectronico}
                        onChange={handleChange}
                      />
                      <label htmlFor="correoElectronico">
                        Correo electrónico
                      </label>
                      <span className="error-text"></span>
                      <i className="error-icon"></i>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group input__group">
                      <input
                        type="text"
                        name="ciudadRadicacion"
                        id="ciudadRadicacion"
                        className="form-control js-control-input"
                        value={formData.ciudadRadicacion}
                        onChange={handleChange}
                      />
                      <label htmlFor="ciudadRadicacion">
                        Ciudad de radicación
                      </label>
                      <span className="error-text"></span>
                      <i className="error-icon"></i>
                    </div>
                  </div>
                  <div className="form-row">
                    <div
                      id="country_wrapper"
                      className="form-group form-select"
                    >
                      <CountriesFormSelect
                        valueAndId={formData.pais}
                        onChange={handleChange}
                      />
                      <span className="error-text"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="pw-ui-control form-group">
                      <div className="pw-ui-phone-input">
                        <div className="pw-ui-control">
                          <div className="pw-ui-control-input__wrapper">
                            <input
                              type="number"
                              name="numeroContacto"
                              className="pw-ui-control-input__field pw-ui-js-control-input no-arrows"
                              id="numeroContacto"
                              value={formData.numeroContacto}
                              onChange={handleChange}
                            />
                            <div className="pw-ui-control-placeholder">
                              Número de contacto
                            </div>
                            <span className="error-text"></span>
                            <i className="error-icon"></i>
                          </div>
                        </div>
                        <div className="pw-ui-phone-input__pseudo-field pw-ui-js-phone-input-toggler">
                          <div className="pw-ui-phone-input__value pw-ui-js-phone-input-show">
                            +
                          </div>
                          <svg
                            width="12"
                            height="5"
                            className="pw-ui-phone-input__arrow"
                          >
                            <use xlinkHref="#pw-ui-ico-chevron"></use>
                          </svg>
                        </div>
                        <CountryCodeForm id="codigo" />
                      </div>
                    </div>
                  </div>
                  <div className="form-row row">
                    <label htmlFor="" className="datePicker-label">
                      Fecha de nacimiento
                    </label>
                    <DatePicker />
                  </div>
                  <div className="form-row row">
                    <label htmlFor="" className="datePicker-label">
                      Área de interés de docencia
                    </label>
                    <AreaForm />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "none" }}
                  >
                    <symbol id="pw-ui-ico-chevron" viewBox="0 0 10 5">
                      <path
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 0L4.999625 4.285714 1 0"
                      ></path>
                    </symbol>
                  </svg>
                  <div className="form-row">
                    <div className="form-group input__group">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Registrarse"
                        name="Registrarse"
                      />
                    </div>
                  </div>
                </form>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
