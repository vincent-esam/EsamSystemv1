import { infoPaises } from "../../api/infoPaises";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  valueAndId: string;
}

export const CountriesFormSelect: React.FC<Props> = ({
  onChange,
  valueAndId,
}) => {
  return (
    <select
      name={valueAndId}
      id={valueAndId}
      required
      className="country-item form-control"
      onChange={onChange}
    >
      <option value="">País</option>
      {infoPaises.map((pais) => (
        <option key={pais.id} value={pais.id}>
          {pais.pais}
        </option>
      ))}
    </select>
  );
};
