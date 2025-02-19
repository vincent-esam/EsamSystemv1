import { connectToDatabase } from "../utils/dbConect";

export async function checkAndUpdateConvocatorias() {
  let db;

  try {
    // Conectar a la base de datos
    db = await connectToDatabase();

    // Obtener la fecha y hora actual
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Consulta para obtener las convocatorias que han pasado su fecha final
    const query = `
      SELECT idConvocatoria
      FROM convocatorias
      WHERE fechaFinal < ? AND estado = 'abierta'
    `;

    const [convocatorias] = await db.execute(query, [now]);

    // Si hay convocatorias que cumplen la condición, actualizar su estado
    if (convocatorias.length > 0) {
      const updateQuery = `
        UPDATE convocatorias
        SET estado = 'cerrada'
        WHERE idConvocatoria = ?
      `;

      for (const convocatoria of convocatorias) {
        await db.execute(updateQuery, [convocatoria.idConvocatoria]);
        console.log(`Convocatoria ${convocatoria.idConvocatoria} actualizada a "cerrada".`);
      }
    } else {
      console.log("No hay convocatorias para actualizar.");
    }
  } catch (error) {
    console.error("Error al verificar y actualizar convocatorias:", error);
  } finally {
    if (db) db.end();
  }
}