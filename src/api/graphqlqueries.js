import { gql } from "graphql-request";

export const GET_PROGRAM_BY_ID = gql`
  query GetProgramById($id: Int!) {
    programa(id: $id) {
      id
      nombre_compuesto
      fecha_inicio
      fecha_fin
      sede {
        nombre
      }
      postgrado {
        area {
          nombre
        }
      }
    }
  }
`;
