export type inputs = {
  id: number;
  input: string;
  nombre: string;
};

export type inputTypes = inputs[];

export const inputFieldsFirstSection: inputTypes = [
  {
    id: 1,
    input: "Nombres",
    nombre: "nombres",
  },
  {
    id: 2,
    input: "Apellido Paterno",
    nombre: "apellidoPaterno",
  },
  {
    id: 3,
    input: "Apellido Materno",
    nombre: "apellidoMaterno",
  },
  {
    id: 4,
    input: "Número de Contacto",
    nombre: "numeroContacto",
  },
  {
    id: 5,
    input: "Número de Referencia",
    nombre: "numeroReferencia",
  },
  {
    id: 6,
    input: "Correo Electrónico",
    nombre: "correoElectronico",
  },
  {
    id: 7,
    input: "Ciudad de Radicación",
    nombre: "ciudadRadicacion",
  },
  {
    id: 8,
    input: "Dirección",
    nombre: "direccion",
  },
];
