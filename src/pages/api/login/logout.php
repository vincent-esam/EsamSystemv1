<?php
// pages/api/login/logout.php

session_start(); // Iniciar la sesión

// Destruir la sesión
session_destroy();

// Respuesta exitosa
echo json_encode(['success' => true, 'message' => 'Sesión cerrada exitosamente']);
?>