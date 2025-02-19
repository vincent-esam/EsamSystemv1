<?php
// check.php
session_start();
header('Content-Type: application/json');

// Verifica si las sesiones están habilitadas
if (session_status() == PHP_SESSION_NONE) {
    echo json_encode([
        'authenticated' => false,
        'error' => 'Las sesiones no están activas en el servidor.',
    ]);
    exit();
}

// Debug: Imprimir toda la sesión
echo json_encode([
    'authenticated' => isset($_SESSION['idDocente']),
    'idRol' => $_SESSION['idRol'] ?? null,
    'session_data' => $_SESSION, // Verificar datos almacenados
]);

?>