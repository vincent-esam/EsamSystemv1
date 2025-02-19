<?php
header("Content-Type: application/json");
require_once "../../../utils/dbConnect.php"; // Asegúrate de que este archivo maneje la conexión a la BD.

try {
    // Obtener parámetros de la URL
    $searchTerm = isset($_GET['search']) ? strtolower($_GET['search']) : null;
    $estado = isset($_GET['estado']) ? $_GET['estado'] : null;

    // Búsqueda avanzada
    if ($searchTerm) {
        $query = "
            SELECT * 
            FROM docentes 
            WHERE 
                estado IN ('postulante') AND
                (
                    LOWER(nombres) LIKE :search OR 
                    LOWER(correo) LIKE :search OR 
                    numeroDocumento LIKE :search OR 
                    LOWER(estudiossuperiores) LIKE :search OR 
                    LOWER(cursos) LIKE :search
                )
        ";

        $stmt = $pdo->prepare($query);
        $likeSearch = "%$searchTerm%";
        $stmt->bindValue(':search', $likeSearch, PDO::PARAM_STR);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($rows);
        exit;
    }

    // Condición por estado
    $estadoCondition = "estado IN ('postulante', 'aprobado', 'rechazado')";
    if ($estado && in_array($estado, ["postulante", "aprobado", "rechazado"])) {
        $estadoCondition = "estado = :estado";
    }
$query = "
SELECT 
    d.idDocente,
    d.apellidoMaterno,
    d.apellidoPaterno,
    d.nombres,
    d.numeroReferencia,
    d.correo,
    d.telefono,
    d.numeroDocumento,
    d.fechaNacimiento,
    d.ciudadRadicacion,
    d.genero,
    d.direccion,
    d.estado,
    d.fotografia,
    d.agendado,

    -- Sector
        COALESCE(JSON_OBJECT('nombre', s.nombre), '{}') AS sector,

        -- País del docente
        COALESCE(JSON_OBJECT('nombre', p.nombre), '{}') AS pais_docente,

        -- Tipo de documento
        COALESCE(JSON_OBJECT('tipo', doc.tipo), '{}') AS tipo_documento,

  -- Estudios superiores
    COALESCE(
        CASE
            WHEN COUNT(es.idEstudioSuperior) > 0 THEN
                CONCAT(
                    '[',
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idEstudio', es.idEstudioSuperior,
                        'idPais', es.idPais,
                        'idGrado', es.idGrado,
                        'idModalidad', es.idModalidad,
                        'tipo', te.tipo,
                        'carrera', es.carrera,
                        'nombre', es.nombre,
                        'universidad', es.universidad,
                        'pais', ep.nombre,
                        'fecha', es.fecha,
                        'modalidad', m.tipo,
                        'gradoTipo', g.tipo,
                        'idTipo', te.idTipoEstudio
                    ) SEPARATOR ','), 
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS estudiosuperiores,

    -- Experiencias docentes
    COALESCE(
        CASE
            WHEN COUNT(ed.idExperienciaDocente) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idExperiencia', ed.idExperienciaDocente,
                        'materia', ed.materia,
                        'calidad', ed.calidad,
                        'universidad', ed.universidad,
                        'concluidoEl', ed.concluidoEl
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS experienciasdocentes,

    -- Idiomas
    COALESCE(
        CASE
            WHEN COUNT(id.idIdiomaDocente) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idIdiomaDocente', id.idIdiomaDocente,
                        'idIdioma', id.idIdioma,
                        'idioma', i.idioma,
                        'escritura', id.escritura,
                        'oral', id.oral,
                        'lectura', id.lectura,
                        'escucha', id.escucha
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS idiomas,

    -- Habilidades blandas
    COALESCE(
        CASE
            WHEN COUNT(hb.idHabilidadBlanda) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idHabilidadBlanda', hb.idHabilidadBlanda,
                        'habilidad', hb.habilidad
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS habilidades_blandas,

    -- Experiencias laborales
    COALESCE(
        CASE
            WHEN COUNT(el.idExperienciaLaboral) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idExperienciaLaboral', el.idExperienciaLaboral,
                        'nombreEmpresa', el.nombreEmpresa,
                        'cargo', el.cargo,
                        'ciudad', el.ciudad,
                        'fechaInicio', el.fechaInicio,
                        'fechaFinal', el.fechaFinal,
                        'pais', epais.nombre,
                        'descripcion', el.descripcion,
                        'referencia', JSON_OBJECT(
                            'idReferencia', r.idReferencia,
                            'nombreCompleto', r.nombreCompleto,
                            'cargoR', r.cargo,
                            'numeroContacto', r.numeroContacto
                        )
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS experienciaslaborales,

    -- Publicaciones intelectuales
    COALESCE(
        CASE
            WHEN COUNT(pi.idProduccionIntelectual) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idProduccionIntelectual', pi.idProduccionIntelectual,
                        'nombre', pi.nombre,
                        'enlaceEditorial', pi.enlaceEditorial,
                        'pais', pp.nombre,
                        'fecha', pi.fecha,
                        'tipoPublicacion', tp.tipo
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS publicacionesintelectuales,

    -- Agendas
    COALESCE(
        CASE
            WHEN COUNT(ag.idAgenda) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'fecha', DATE_FORMAT(ag.fecha, '%Y-%m-%d %H:%i:%s'),
                        'link', ag.linkZoom
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS detalles,

    -- Áreas
    COALESCE(
        CASE
            WHEN COUNT(ar.idArea) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'idArea', ar.idArea
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS areas,

    -- Cursos
    COALESCE(
        CASE
            WHEN COUNT(c.idCurso) > 0 THEN
                CONCAT(
                    '[', 
                    GROUP_CONCAT(DISTINCT JSON_OBJECT(
                        'nombre', c.nombre,
                        'universidad', c.lugar,
                        'pais', p2.nombre,
                        'anio', c.fechaInicio
                    )),
                    ']'
                )
            ELSE '[]'
        END,
        '[]'
    ) AS cursos,
      -- Archivos del docente
        COALESCE(
            CONCAT(
                '[', 
                GROUP_CONCAT(DISTINCT JSON_OBJECT(
                    'idArchivo', ad.id_ad,
                    'fechaSubida', ad.createdAt,
                    'nombreArchivo', ad.nombre_archivo,
                    'rutaArchivo', ad.ruta_archivo,
                    'idTipoArchivo', ad.idTipo_archivo,
                    'tipoArchivo', ta.tipo
                )),
                ']'
            ),
            '[]'
        ) AS archivosDocente

FROM 
    docentes d
    LEFT JOIN sectores s ON d.idSector = s.idSector
    LEFT JOIN paises p ON d.idPais = p.idPais
    LEFT JOIN documentos doc ON d.idDocumento = doc.idDocumentos
    LEFT JOIN docentes_estudios de ON d.idDocente = de.idDocente
    LEFT JOIN estudiossuperiores es ON de.idEstudioSuperior = es.idEstudioSuperior
    LEFT JOIN tiposestudios te ON es.idTipoEstudio = te.idTipoEstudio
    LEFT JOIN modalidades m ON es.idModalidad = m.idModalidad
    LEFT JOIN grados g ON es.idGrado = g.idGrado
    LEFT JOIN paises ep ON es.idPais = ep.idPais  
    LEFT JOIN docente_experienciadocente ded ON d.idDocente = ded.idDocente
    LEFT JOIN experienciadocente ed ON ded.idExperienciaDocente = ed.idExperienciaDocente
    LEFT JOIN idiomas_docente id ON d.idDocente = id.idDocente
    LEFT JOIN idiomas i ON id.idIdioma = i.idIdioma
    LEFT JOIN habilidadesblandas hb ON d.idDocente = hb.idDocentes
    LEFT JOIN docente_experiencias dexp ON d.idDocente = dexp.idDocente
    LEFT JOIN experiencialaboral el ON dexp.idExperienciaLaboral = el.idExperienciaLaboral
    LEFT JOIN paises epais ON el.idPais = epais.idPais
    LEFT JOIN referencias r ON el.idReferencia = r.idReferencia
    LEFT JOIN docentes_publicacionesintelectuales dpi ON d.idDocente = dpi.idDocente
    LEFT JOIN produccionesintelectuales pi ON dpi.idProduccionIntelectual = pi.idProduccionIntelectual
    LEFT JOIN paises pp ON pi.idPais = pp.idPais
    LEFT JOIN tipospublicaciones tp ON pi.idTipoPublicacion = tp.idTipoPublicacion
    LEFT JOIN agendas ag ON d.idDocente = ag.idDocente
    LEFT JOIN areas ar ON d.idAreaInteres = ar.idArea
    LEFT JOIN docente_curso dc ON d.idDocente = dc.idDocente
    LEFT JOIN cursos c ON dc.idCurso = c.idCurso
    LEFT JOIN paises p2 ON c.idPais = p2.idPais
    LEFT JOIN archivos_docentes ad ON d.idDocente = ad.idDocente
    LEFT JOIN tipo_archivo ta ON ad.idTipo_archivo = ta.id_ta
WHERE $estadoCondition 
GROUP BY d.idDocente";
$stmt = $pdo->prepare($query);

if ($estado && in_array($estado, ["postulante", "aprobado", "rechazado"])) {
    $stmt->bindValue(':estado', $estado, PDO::PARAM_STR);
}

$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Convertir campos JSON a arrays/objetos PHP
foreach ($rows as &$row) {
    $row['estudiosuperiores'] = json_decode($row['estudiosuperiores'], true);
    $row['experienciasdocentes'] = json_decode($row['experienciasdocentes'], true);
    $row['idiomas'] = json_decode($row['idiomas'], true);
    $row['habilidades_blandas'] = json_decode($row['habilidades_blandas'], true);
    $row['experienciaslaborales'] = json_decode($row['experienciaslaborales'], true);
    $row['publicacionesintelectuales'] = json_decode($row['publicacionesintelectuales'], true);
    $row['detalles'] = json_decode($row['detalles'], true);
    $row['areas'] = json_decode($row['areas'], true);
    $row['cursos'] = json_decode($row['cursos'], true);
    $row['archivosDocente'] = json_decode($row['archivosDocente'], true);
}

echo json_encode($rows);
} catch (PDOException $e) {
http_response_code(500);
echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>