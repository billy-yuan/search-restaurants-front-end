import Select from "react-select";
import "./style.css";

export type FilterOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  dropdownName: string;
  options: FilterOption[];
  currentFilter: { [key: string]: string[] };
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
  isDisabled: boolean;
  onChange: () => void;
};

type FilterProps = {
  filterOptions: { [key: string]: FilterOption[] };
  currentFilter: { [key: string]: string[] };
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
  isLoading: boolean;
  onChange: () => void;
};

function Dropdown({
  dropdownName,
  options,
  currentFilter,
  setFilter,
  isDisabled = false,
  onChange,
}: DropdownProps) {
  const selectedOptionsArray = currentFilter[dropdownName];
  const values = options.filter((value) =>
    selectedOptionsArray.includes(value.value)
  );

  return (
    <div className="dropdown-container">
      <Select
        name={dropdownName}
        isMulti
        isDisabled={isDisabled}
        placeholder={dropdownName}
        options={options}
        value={values}
        onChange={(e) => {
          onChange();
          setFilter({
            ...currentFilter,
            [dropdownName]: e.map((option) => option.value),
          });
        }}
      />
    </div>
  );
}

function Filter({
  filterOptions,
  currentFilter,
  setFilter,
  isLoading,
  onChange,
}: FilterProps) {
  return (
    <div className="filter-container">
      <div className="dropdowns-container">
        {Object.keys(filterOptions).map((option) => (
          <Dropdown
            key={`dropdown-${option}`}
            dropdownName={option}
            options={filterOptions[option]}
            currentFilter={currentFilter}
            setFilter={setFilter}
            isDisabled={isLoading}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
