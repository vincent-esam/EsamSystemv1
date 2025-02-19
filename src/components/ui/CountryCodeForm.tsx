import { infoPaises } from "../../api/infoPaises";

interface Props {
  valueAndId: string;
}

export const CountryCodeForm: React.FC<Props> = ({ valueAndId }) => {
  return (
    <div className="pw-ui-phone-input__list">
      <ul className="pw-ui-phone-input__bottom-list" id={valueAndId}>
        {infoPaises.map((pais) => (
          <li
            className="pw-ui-phone-input__list-item pw-ui-js-phone-input-option"
            data-value={pais.codigo}
            data-text={pais.codigo}
            id="phone-bottom-list-item"
            key={pais.id}
          >
            <span className="pw-ui-phone-input__number phone-code">
              +{pais.codigo}
            </span>
            <span className="pw-ui-phone-input__country phone-country">
              {pais.pais}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
