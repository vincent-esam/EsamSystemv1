import { InputRegistro } from "../../ui/InputRegistro";
import { inputFieldsFirstSection } from "../../../api/campos";
import { CountriesFormSelect } from "../../ui/CountriesFormSelect";
import { ImageUpload } from "../../upload/Uploadimages";
import { infoDocumentos, extencion } from "../../../api/infoDocumento";
import { DecisionComponent } from "../../switches/Switch";
import "../style/step1.css";

// Función para dividir el array en chunks
const chunkArray = (array, chunkSize) => {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
};

// Agrupar los campos de entrada en grupos de 3
const groupedFields = chunkArray(inputFieldsFirstSection, 3);

export const Step1Form = () => {
  return (
    <>
      {/* Componente para subir imágenes */}
      <ImageUpload />

      {/* Contenedor principal */}
      <div className="form-container">
        {/* Iteramos sobre los grupos de campos */}
        {groupedFields.map((group, index) => (
          <div className="form-row" key={index}>
            {/* Iteramos sobre cada campo del grupo */}
            {group.map((input) => (
              <div className="form-col" key={input.id}>
                <InputRegistro info={input.input} name={input.nombre} id={input.id} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Sección de país, ciudad y dirección */}
      <div className="form-row">
        <div className="form-col">
          <CountriesFormSelect valueAndId="pais" />
        </div>
      </div>

      {/* Sección de fecha de nacimiento */}
      <div className="form-row">
        <div className="form-col">
          <input
            name="fechaNacimiento"
            type="date"
            className="input-date"
            placeholder="Fecha de Nacimiento"
            autoComplete="off"
            id="fechaNacimiento"
          />
        </div>
      </div>

      {/* Sección de tipo de documento y extensión */}
      <div className="form-row">
        <div className="form-col">
          <select name="tipoDocumento" id="tipoDocumento" className="form-select">
            <option value="">Tipo de Documento</option>
            {infoDocumentos.map((tipo, index) => (
              <option key={index} value={tipo.tipo}>
                {tipo.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-col">
          <InputRegistro info="Numero de Documento" name="numeroDocumento" id="numeroDocumento" />
        </div>
        <div className="form-col">
          <select name="extension" id="extension" className="form-select">
            <option value="">Extension</option>
            {extencion.map((ext, index) => (
              <option key={index} value={ext.ext}>
                {ext.ext}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DecisionComponent />
    </>
  );
};
