import { infoAreas, infoSectores } from "../../api/infoAreas";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedArea: string;
  selectedSector: string;
}

export const AreaForm: React.FC<Props> = ({
  onChange,
  selectedArea,
  selectedSector,
}) => {
  return (
    <div className="area-interes">
     
        <select
          className="area-select"
          required
          name="idAreaInteres"
          id="idAreaInteres"
          value={selectedArea}
          onChange={onChange}
        >
          <option value="">Área</option>
          {infoAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.categoria}
            </option>
          ))}
        </select>
        <span className="error-text"></span>
        <i className="error-icon"></i>
      
      
        <select
           className="area-select"
          required
          name="idSector"
          id="idSector"
          value={selectedSector}
          onChange={onChange}
        >
          <option value="">Sector</option>
          {infoSectores.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.sector}
            </option>
          ))}
        </select>
        <span className="error-text"></span>
        <i className="error-icon"></i>
      </div>
   
  );
};
