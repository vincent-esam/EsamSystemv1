<?php

require '../../../utils/dbConnect.php';
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data['usuario'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM docentes WHERE usuario = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Usamos $user en lugar de $docente
        $_SESSION['idDocente']       = $user['idDocente'];
        $_SESSION['usuario']         = $user['usuario'];
        $_SESSION['nombre']          = $user['nombres'];
        $_SESSION['apellidoPaterno'] = $user['apellidoPaterno'];
        $_SESSION['idRol']           = $user['idRol'];

        echo json_encode([
            "success" => true,
            "message" => "Login exitoso", 
            "user"    => $user['usuario'],
            "idRol"   => $user['idRol']
        ]);
        error_log("Sesión iniciada: " . print_r($_SESSION, true)); 
    } else {
        echo json_encode([
            "success" => false,
            "error"   => "Credenciales incorrectas"
        ]);
    }
}
?>
