import { useState } from "react";

export const PdfUpload = () => {
  // Estado para almacenar el archivo PDF seleccionado
  const [pdf, setPdf] = useState(null);

  // Manejar el cambio de archivo
  const handlePdfChange = (event) => {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
    if (file && file.type === "application/pdf") {
      setPdf(file.name); // Guardar el nombre del archivo PDF
    } else {
      alert("Por favor, selecciona un archivo PDF"); // Alerta si el archivo no es PDF
    }
  };

  return (
    <div>
      {/* Input para seleccionar el archivo PDF */}
      <label htmlFor="pdf-upload">Selecciona un archivo PDF</label>
      <input
        type="file"
        name="pdfUploadES"
        id="pdfUploadES"
        accept="application/pdf"
        onChange={handlePdfChange}
      />

      {/* Mostrar el nombre del archivo PDF seleccionado */}
      {pdf && <p>Archivo seleccionado: {pdf}</p>}
    </div>
  );
};
