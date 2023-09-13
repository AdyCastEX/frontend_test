import Select from "react-select"
import { useState, useId, useEffect } from "react"

type ControlsProps = {
  onSortingChange: (field: string, direction: string) => void
}

const Controls = ({ onSortingChange }: ControlsProps) => {
  const [sortingField, setSortingField] = useState<string>("name")
  const [sortingDirection, setSortingDirection] = useState<string>("ascending")
  const [sortingFieldLabel, setSortingFieldLabel] = useState<string>("Name")
  const [sortingDirectionLabel, setSortingDirectionLabel] =
    useState<string>("Ascending")

  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company.name" },
    { label: "Email", value: "email" },
  ]
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ]

  // Function to handle sorting option changes
  const handleSortingChange = () => {
    onSortingChange(sortingField, sortingDirection)
  }
  // trigger the sort whenever sortig parameters are changed
  useEffect(() => {
    handleSortingChange()
  }, [sortingField, sortingDirection])

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
          value={{ label: sortingFieldLabel, value: sortingField }}
          isSearchable={false}
          instanceId={useId()}
          onChange={(selectedOption) => {
            setSortingField(selectedOption?.value || "")
            setSortingFieldLabel(selectedOption?.label || "")
          }}
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
          value={{ label: sortingDirectionLabel, value: sortingDirection }}
          instanceId={useId()}
          onChange={(selectedOption) => {
            setSortingDirection(selectedOption?.value || "")
            setSortingDirectionLabel(selectedOption?.label || "")
          }}
          isSearchable={false}
        />
      </div>
    </div>
  )
}

export default Controls
