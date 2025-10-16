import Select from "react-select";
import { SortField, SortDirection, FieldOption, DirectionOption } from "./types/user";

type ControlsProps = {
  onSortFieldChange: (value: SortField) => void;
  onSortDirectionChange: (value: SortDirection) => void;
};

const Controls = ({ onSortFieldChange, onSortDirectionChange }: ControlsProps ) => {
  const fieldOptions: FieldOption[] = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions: DirectionOption[] = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select 
          options={fieldOptions} 
          inputId="sort-field" 
          className="input" 
          defaultValue={fieldOptions[0]}
          onChange={(option) => onSortFieldChange(option?.value || "name")}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          defaultValue={directionOptions[0]}
          onChange={(option) => onSortDirectionChange(option?.value || "asc")}
        />
      </div>
    </div>
  );
};

export default Controls;
