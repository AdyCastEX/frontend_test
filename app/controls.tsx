import { useEffect, useState } from "react";
import Select from "react-select";

const Controls = (props: any) => {
  const {
    handleSortField,
    handleSortDirection
  } = props
  
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const handleFieldValue = (
    filter: any
  ) => {
    handleSortField(filter.value)
  }
  const handleDirectOptions = (
    filter: any
  ) => {
    handleSortDirection(filter.value)
  }

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
          onChange={handleFieldValue}
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
          onChange={handleDirectOptions}
        />
      </div>
    </div>
  );
};

export default Controls;
