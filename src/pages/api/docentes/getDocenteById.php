<?php
header("Content-Type: application/json");
require_once "../../../utils/dbConnect.php"; // Asegúrate de que este archivo maneje la conexión a la BD.

// Obtener el parámetro idDocente desde la URL
$idDocente = isset($_GET['idDocente']) ? intval($_GET['idDocente']) : null;

if (!$idDocente) {
    http_response_code(400);
    echo json_encode(["error" => "ID del docente inválido"]);
    exit;
}

try {
    // Consulta SQL para obtener los datos del docente
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
    CASE 
        WHEN COUNT(ad.id_ad) > 0 THEN
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
            )
        ELSE '[]'
    END,
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
    WHERE 
        d.idDocente = :idDocente
    GROUP BY 
        d.idDocente;
    ";

    // Preparar y ejecutar la consulta
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':idDocente', $idDocente, PDO::PARAM_INT);
    $stmt->execute();
    $docenteData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$docenteData) {
        http_response_code(404);
        echo json_encode(["error" => "Docente no encontrado"]);
        exit;
    }

    // Convertir campos JSON a arrays/objetos PHP
    $docenteData['estudiosuperiores'] = json_decode($docenteData['estudiosuperiores'], true);
    $docenteData['experienciasdocentes'] = json_decode($docenteData['experienciasdocentes'], true);
    $docenteData['idiomas'] = json_decode($docenteData['idiomas'], true);
    $docenteData['habilidades_blandas'] = json_decode($docenteData['habilidades_blandas'], true);
    $docenteData['experienciaslaborales'] = json_decode($docenteData['experienciaslaborales'], true);
    $docenteData['publicacionesintelectuales'] = json_decode($docenteData['publicacionesintelectuales'], true);
    $docenteData['detalles'] = json_decode($docenteData['detalles'], true);
    $docenteData['areas'] = json_decode($docenteData['areas'], true);
    $docenteData['cursos'] = json_decode($docenteData['cursos'], true);
    $docenteData['archivosDocente'] = json_decode($docenteData['archivosDocente'], true);
 

    // Devolver los datos como JSON
    echo json_encode($docenteData);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener el docente: " . $e->getMessage()]);
}
?>