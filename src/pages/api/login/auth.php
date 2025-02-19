<?php
// auth.php
require '../../../utils/dbConnect.php';
session_start(); // Iniciar la sesión

// Obtener los datos del formulario
$data = json_decode(file_get_contents("php://input"), true);
$usuario = $data['usuario'];
$password = $data['password'];

try {
    // Buscar el usuario en la base de datos
    $query = "SELECT * FROM docentes WHERE usuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception('Usuario no encontrado');
    }

    $docente = $result->fetch_assoc();

    // Verificar la contraseña
    if (!password_verify($password, $docente['password'])) {
        throw new Exception('Contraseña incorrecta');
    }

    // Crear la sesión
    $_SESSION['idDocente'] = $docente['idDocente'];
    $_SESSION['usuario'] = $docente['usuario'];
    $_SESSION['nombre'] = $docente['nombres'];
    $_SESSION['apellidoPaterno'] = $docente['apellidoPaterno'];
    $_SESSION['idRol'] = $docente['idRol'];

    // Respuesta exitosa
    echo json_encode(['success' => true, 'message' => 'Login exitoso']);
} catch (Exception $e) {
    // Manejar errores
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>