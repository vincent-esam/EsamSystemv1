import cron from "node-cron"
import { checkAndUpdateConvocatorias } from "./checkConvocatorias.js";

// Programar el cron job para ejecutarse cada minuto
cron.schedule("* * * * *", async () => {
  try {
    console.log("Ejecutando verificación de convocatorias...");
    await checkAndUpdateConvocatorias();
  } catch (error) {
    console.error("Error en el cron job:", error);
  }
});