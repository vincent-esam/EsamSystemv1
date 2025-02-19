import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors()); // Permite solicitudes de diferentes orígenes
app.use(express.json());

// Configura Resend con tu API Key
const resendClient = new Resend("re_hsV95T8N_2uYdgGKFzT867aM9pwV1EuT4");

// Endpoint para enviar correos de entrevistas
app.post("/send-email", async (req, res) => {
  const { fecha, hora, zoomLink } = req.body;

  try {
    // Lee la plantilla HTML de entrevistas
    const templatePath = path.join(__dirname, "../pages/postulantes/email/template.html");
    let templateHtml = fs.readFileSync(templatePath, "utf8");

    // Reemplaza las variables en la plantilla
    templateHtml = templateHtml
      .replace("{{fecha}}", fecha)
      .replace("{{hora}}", hora)
      .replace("{{zoomLink}}", zoomLink);

    // Envía el correo
    const response = await resendClient.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "samchp4903@gmail.com", // Aquí usarías el correo real del destinatario
      subject: "Entrevista Agendada",
      html: templateHtml,
    });

    console.log("Correo enviado:", response);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({
      message: "Error al enviar el correo",
      error: error.message || "Error desconocido",
    });
  }
});

// Endpoint para enviar correos de resultados de docentes
app.post("/send-email-docente", async (req, res) => {
  const { action, documentoUrl, postulanteId } = req.body;

  try {
    // Lee la plantilla HTML de resultados de docentes
    const templatePath = path.join(__dirname, "../pages/postulantes/email/templateDocente.html");
    let templateHtml = fs.readFileSync(templatePath, "utf8");

    // Reemplaza las variables en la plantilla
    templateHtml = templateHtml
      .replace("{{action}}", action)
      .replace("{{documentoUrl}}", documentoUrl)
      .replace("{{postulanteId}}", postulanteId);

    // Envía el correo
    const response = await resendClient.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "samchp4903@gmail.com", // Aquí usarías el correo real del docente
      subject: `Resultado de evaluación de docente: ${action === "aprobado" ? "Aprobado" : "Rechazado"}`,
      html: templateHtml,
    });

    console.log("Correo enviado:", response);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({
      message: "Error al enviar el correo",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
