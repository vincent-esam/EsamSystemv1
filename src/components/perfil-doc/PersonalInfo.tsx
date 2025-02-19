import type { ChangeEvent } from "react"; // Cambia esto


// Definimos las interfaces para las props del componente
interface Docente {
  documento: string;
  telefono: string;
}

interface PersonalInfoProps {
  docente: Docente | null; // Si el docente puede ser nulo
  isEditing: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ docente, isEditing, handleInputChange }) => {
  // Aseguramos que docente no sea null antes de acceder a sus propiedades
  if (!docente) {
    return <p>Información del docente no disponible</p>;
  }

  return (
    <div className="profile-details">
      <h2>Información Personal</h2>
      {isEditing ? (
        <>
          <input
            type="text"
            name="documento"
            value={docente.documento}
            onChange={handleInputChange}
            className="editable-input"
          />
          <input
            type="text"
            name="telefono"
            value={docente.telefono}
            onChange={handleInputChange}
            className="editable-input"
          />
        </>
      ) : (
        <>
          <p>
            <strong>Documento:</strong> {docente.documento}
          </p>
          <p>
            <strong>Teléfono:</strong> {docente.telefono}
          </p>
        </>
      )}
    </div>
  );
};

export default PersonalInfo;
