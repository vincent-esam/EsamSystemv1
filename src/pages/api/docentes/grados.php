<?php
header("Content-Type: application/json");
require_once "../../../utils/dbConnect.php"; // Asegúrate de que este archivo maneje la conexión a la BD.

try {
    // Consulta SQL para obtener los grados de la tabla "grados"
    $query = "SELECT idGrado, tipo FROM grados";

    // Preparar y ejecutar la consulta
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    // Obtener los resultados
    $grados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si se encontraron resultados
    if ($grados) {
        // Devolver los resultados en formato JSON
        echo json_encode($grados);
    } else {
        // Si no se encontraron grados académicos
        echo json_encode(["error" => "No se encontraron grados académicos"]);
    }

} catch (PDOException $e) {
    // Manejo de errores en caso de fallo
    echo json_encode(["error" => "Error al obtener los grados académicos: " . $e->getMessage()]);
}
?>
