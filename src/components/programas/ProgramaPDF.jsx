import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingLeft:60,
    paddingRight:60,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333",
    position: "relative",
    minHeight: "100%",
    fontFamily:"Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottom: "2px solid #6b85a5",
    paddingBottom: 5,
    marginLeft: -20, // Ajusta este valor según la diferencia deseada
    marginRight: -20, // Ajusta este valor según la diferencia deseada
  },
  
  logo: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  headerText: {
    fontSize: 12,
    color: "#666",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Helvetica-Bold",
    color: "#666",
  },
  subtitle:{
    fontSize:12, 
    fontWeight: "bold",
    fontFamily:"Helvetica-Bold",
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily:"Helvetica-Bold",
    fontSize:10,
  },
  dateAndID: {
    textAlign: "right",
    marginTop: 5,
    marginBottom: 1,
  },
  refSection: {
    fontWeight: 'bold',
    fontFamily:"Helvetica-Bold",
    marginTop: 10,
    fontSize: 10,
    textDecoration: "underline",
  },
  refContent: {
    marginTop: 2,
    fontWeight: 'bold',
    fontFamily:"Helvetica-Bold",
  },
  leftDetails: {
    marginTop: 1,
    textAlign: "left",
  },
  rightDetails: {
    fontWeight: 'bold',
    fontFamily:"Helvetica-Bold",
    marginTop: 1,
    textAlign: "right",
    fontSize: 10,
   
  },
  contentSection: {
    marginTop: 10,
    textAlign: "justify",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: "1px solid #000",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableHeaderCell: {
    padding: 6,
    backgroundColor: "#214572",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    borderRight: "1px solid #000", // Borde negro
    borderBottom: "1px solid #000", 
    color: "#FFF", // Color de texto blanco
  },
  tableCell: {
    padding: 6,
    textAlign: "center",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000", 
  },
  tableHeaderContent: {
    flex: 4,
    borderBottom: "none", 
  },
  tableHeaderSmall: {
    flex: 1,
    borderBottom: "1px solid #000", 
  },
  noBorderCell: {
    flex: 4,
    padding: 6,
    backgroundColor: "#214572",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    border: "none", // Elimina completamente las divisiones.
    color:"#FFF",
    borderRight: "1px solid #000",
  },
  
  contentSections: {
    textAlign: "justify",
    fontSize: 10,
    lineHeight: 1.5,
    marginLeft: 30,
  },
  subItem: {
    textAlign: "justify",
    fontSize: 10,
    lineHeight: 1.5,
  },
  listItem: {
    textAlign: "justify",
    fontSize: 10,
    lineHeight: 1.5,
    marginLeft: 60,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    marginTop: 20,
    paddingTop: 10,
    borderTop: "2px solid #6b85a5",
    color: "#666",
  },
});

const ProgramaContent = ({ programa, modulo }) => (
  <Document>
    <Page size="LEGAL" style={styles.page}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image src="/images/LogoUniversidadXX.jpeg" style={styles.logo} />
        <View>
          <Text style={styles.title}>UNIVERSIDAD NACIONAL SIGLO XX</Text>
          <Text style={styles.headerText}>
            Escuela de Postgrado - Cochabamba
          </Text>
        </View>
      </View>

      <Text style={styles.dateAndID}>
        Cochabamba, {new Date().toLocaleDateString()}
        {"\n"}ID: {modulo.id}
      </Text>

      {/* Detalles a la izquierda */}
      <View style={styles.leftDetails}>
        <Text>A: {modulo.docente}</Text>
        <Text>De: ALEJANDRA RODRIGUEZ</Text>
        <Text style={styles.boldText}>COORDINADORA DE PROGRAMA</Text>
      </View>

      <View style={styles.rightDetails}>
        <Text style={styles.refSection}>
          REF: INVITACIÓN PARA IMPARTIR DOCENCIA
        </Text>
        <Text style={styles.refContent}>
          {modulo.nombre}
          {"\n"}DIPLOMADO EN {programa.diplomado}
        </Text>
      </View>

      {/* Contenido de la carta */}
      <Text style={styles.contentSection}>
        Estimado/a Docente:
        {"\n"}Como preámbulo, reciba usted el más cordial saludo y deseos de éxito en las labores que desempeña como profesional sobresaliente;
         conocedores de su amplia experiencia profesional y conocimientos académicos,
          nos permitimos hacerle la presente invitación para que pueda formar parte de nuestro selecto plantel docente,
           y pueda compartir sus conocimientos y experiencias.{"\n"} La Escuela de Negocios ESAM está avalada bajo convenio con la Universidad Nacional Siglo XX,
            seguros de contar con su valiosa participación, comparto el cronograma y el contenido mínimo del módulo,
             así como todo lo relacionado a la estructura de calificación y honorarios profesionales:
      </Text>

      {/* Tabla de cronograma */}
      <Text style={styles.subtitle}>
        1. CRONOGRAMA Y CONTENIDO
      </Text>
      {"\n"}
      <View style={styles.table}>
        <View style={styles.tableRow}>
        <Text style={[styles.tableHeaderCell,styles.noBorderCell]}>
            CONTENIDOS MINIMOS TENTATIVOS
          </Text>
          <Text style={[styles.tableHeaderCell, styles.tableHeaderSmall]}>
            ACTIVIDAD
          </Text>
          <Text style={[styles.tableHeaderCell, styles.tableHeaderSmall]}>
            FECHA
          </Text>
          <Text style={[styles.tableHeaderCell, styles.tableHeaderSmall]}>
            HORA
          </Text>
        </View>
        {Object.entries(modulo.fecha_de_clases[0]).map(
          ([sesion, fecha], index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeaderContent]}>
                {modulo.contenido_minimo}
              </Text>
              <Text style={[styles.tableCell, styles.tableHeaderSmall]}>
                Sesión Clase {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.tableHeaderSmall]}>
                {fecha}
              </Text>
              <Text style={[styles.tableCell, styles.tableHeaderSmall]}>
                {modulo.hora_inicio} - {modulo.hora_fin}
              </Text>
            </View>
          )
        )}
      </View>

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text>AVENIDA RAMÓN RIVERO - PLAZUELA QUINTANILLA</Text>
        <Text>EDIFICIO LOS TIEMPOS | TORRE 1 PISO 10 | CEL: +591 62671307</Text>
      </View>
    </Page>
    {/* Segunda página con información estática */}
    <Page size="LEGAL" style={styles.page}>
      {/* Encabezado en la segunda página */}
      <View style={styles.header}>
        <Image src="/images/LogoUniversidadXX.jpeg" style={styles.logo} />
        <View>
          <Text style={styles.title}>UNIVERSIDAD NACIONAL SIGLO XX</Text>
          <Text style={styles.headerText}>
            Escuela de Postgrado - Cochabamba
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>METODOLOGÍA ACADÉMICA</Text>

      <Text style={styles.contentSections}>
        <Text style={styles.boldText}>• Plataforma Zoom: </Text>
        (Plataforma sincrónica) donde se llevan a cabo las clases de
        manera semanal y en donde los posgraduantes realizan sus dudas,
        consultas e interactúan  con el docente.
        {"\n"}
        <Text style={styles.boldText}>• Plataforma Moodle:</Text>
        {"\n"}(Plataforma asincrónica) donde se realizan las actividades y
        evaluaciones hacia los posgraduantes, por ello a su persona se le asigna un usuario y contraseña,
        para ingresar a través de la siguiente URL (direccion de la platafoma):{" "}
        <Text
          style={{ color: "#007bff", textDecoration: "underline" }}
          onPress={() =>
            Linking.openURL(
              "https://esam.edu.bo/moodle/my/courses.php"
            )
          }
        >
         https://esam.edu.bo/moodle/my/courses.php
        </Text>
      </Text>

      <Text style={styles.subtitle}>{"\n"}2. PLANIFICACIÓN ACADÉMICA</Text>
      <Text style={[styles.subItem]}>
        Deberá subir una semana antes de cada clase la siguiente documentacion:
      </Text>
      <Text style={styles.contentSections}>
        • Plan global de la materia (Nombre del módulo, objetivos especificos de enseñanza, metodologia, recursos didacticos y material bibliográfico)
        {"\n"}• Diapositiva de la semana
        {"\n"}• Todo el material bibliográfico de consulta (artículos, documentos referentes, enlaces, etc.)
        {"\n"}• Todas las actividades evaluativas con solucionarios.
        {"\n"}• Cápsulas de resumen de videos (Gestionado por coordinación).
      </Text>
      <Text style={styles.boldText}>
        * Las actividades planificadas deberán estar orientadas a la práctica
        contextual real.
      </Text>
      <Text style={styles.subtitle}>{"\n"}3. METODOLOGÍA PARA LAS EVALUACIONES</Text>
      <Text style={styles.subItem}>
        <Text style={styles.boldText}>Las calificaciones deben registrarse en la Plataforma Moodle </Text>
        de acuerdo
        al cronograma establecido de forma obligatoria, debiendo, además, enviar
        como respaldo la plantilla de notas al <Text style={styles.boldText}>Correo Electrónico:{" "}</Text>
      </Text>

      <Text
        style={{ color: "#007bff", textDecoration: "underline" }}
        onPress={() =>
          Linking.openURL("mailto:anahi.vega@esam.edu.bo")
        }
      >
        anahi.vega@esam.edu.bo
      </Text>

      <Text style={styles.subtitle}>{"\n"}4. OBLIGACIONES DEL DOCENTE</Text>
      {"\n"}
      <Text style={styles.contentSections}>
        • Deberá enviar su hoja de vida documentada (grados académicos, títulos
        y certificados), fotocopia del CI, para la carpeta académica de la
        Universidad Nacional Siglo XX, en formato pdf.
        {"\n"}• Presentar el plan global en la primera clase del módulo
        correspondiente.
        {"\n"}• Presentar las siguientes ACTAS:{" "}
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.boldText}>• Acta 01.</Text>
        Formato plan académico modular (presentar a los participantes y subirlo a la plataforma el primer día de clases).
        {"\n"}<Text style={styles.boldText}>• Acta 02.</Text> Informe de Plan de Desarrollo Curricular (redacción en tiempo pasado del cumplimento de la primera acta).
        {"\n"}<Text style={styles.boldText}>• Acta 03.</Text>  Planilla de Acta de Notas (calificaciones finales APROBADOS Y REPROBADOS).
        {"\n"}<Text style={styles.boldText}>• Acta 04.</Text>  Desarrollo Curricular de Notas (las columnas pueden ser modificadas  acorde a las actividades calificadas).
        {"\n"}<Text style={styles.boldText}>• Acta 05.</Text> Planilla de Acta de Notas de Segunda Instancia (nota única de  71 puntos). Solicitar acta, si corresponde.
      </Text>
      <Text style={styles.contentSections}>
        • Las actas deben presentarse de acuerdo al cronograma. El
        incumplimiento de esta cláusula deshabilita al docente para seguir
        dentro del plantel docente.
        {"\n"}• En caso de que surja algún inconveniente que impida su presencia
        en el desarrollo del módulo, deberá enviar su reemplazo con una
        preparación académica igual o superior a la suya, con el fin de velar la
        calidad académica que la Universidad imparte a los posgraduantes.
        {"\n"}<Text style={styles.boldText}>• Es obligatorio del Docente gestionar las actividades en
        plataforma Moodle, interactuar y responder a las dudas del posgraduante.</Text> 
        {"\n"}• Al finalizar el módulo, el docente estará sujeto a la evaluación
        registrada por los posgraduantes, otorgando al docente una valoración
        cuali/cuanti que permita al docente mejorar las competencias pedagógicas
        y su recontratación.
      </Text>

      {/* Pie de página en la segunda página */}
      <View style={styles.footer}>
        <Text>AVENIDA RAMÓN RIVERO - PLAZUELA QUINTANILLA</Text>
        <Text>EDIFICIO LOS TIEMPOS | TORRE 1 PISO 10 | CEL: +591 62671307</Text>
      </View>
    </Page>
    <Page size="LEGAL" style={styles.page}>
      {/* Encabezado en la segunda página */}
      <View style={styles.header}>
        <Image src="/images/LogoUniversidadXX.jpeg" style={styles.logo} />
        <View>
          <Text style={styles.title}>UNIVERSIDAD NACIONAL SIGLO XX</Text>
          <Text style={styles.headerText}>
            Escuela de Postgrado - Cochabamba
          </Text>
        </View>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.subtitle}>5. HONORARIOS PROFESIONALES</Text>
        <Text>
        En cuanto a honorarios se le cancelará a la conclusión del módulo y previa presentación de Notas,
         3550 Tres Mil Quinientos Cincuenta 00/100 bolivianos, <Text style={styles.boldText}>(CON FACTURA) </Text>de los cuales se le realizará la retención por servicios profesionales
          y serán depositados al número de cuenta que sea brindado por su persona para el abono en fechas 14 y 28 del mes.{"\n"}
          <Text style={styles.boldText}>
          En caso de no presentar las actas, no se procede al cumplimiento del depósito en fechas estipuladas, 
          es responsabilidad del docente cumplir las fechas para la efectuación de pago.
          </Text>
        </Text>
        <Text>
          Asimismo aclarar que se enviará el formato de los informes y los
          mismos deberán ser firmados y enviados vía correo electrónico.
        </Text>
        <Text>
          <Text style={styles.boldText}>Nota:</Text> Deberá emitir la
          factura correspondiente por los servicios prestados a favor de{" "}
          <Text style={styles.boldText}>
            ESCUELA DE NEGOCIOS ESAM S.R.L.
          (NIT: 380096028) con el detalle: Servicios Profesionales.</Text>
        </Text>
        <Text>
          Para ello debe tener habilitado su NIT con la actividad       
            CONSULTORES, SERVICIOS PROFESIONALES Y TÉCNICOS
          para la emisión de factura por Servicios Profesionales.
        </Text>
        <Text>Sin otro particular, me despido atentamente.</Text>
      </View>
      {/* Pie de página en la tercer página */}
      <View style={styles.footer}>
        <Text>AVENIDA RAMÓN RIVERO - PLAZUELA QUINTANILLA</Text>
        <Text>EDIFICIO LOS TIEMPOS | TORRE 1 PISO 10 | CEL: +591 62671307</Text>
      </View>
    </Page>
  </Document>
);

export const ProgramaPDFDownload = ({ programa, modulo }) => (
  <div>
    <PDFDownloadLink
      document={<ProgramaContent programa={programa} modulo={modulo} />}
      fileName="invitacion.pdf"
    >
      {({ loading }) => (
        <button className="download-btn">
          {loading ? "Generando PDF..." : "Descargar PDF"}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);
