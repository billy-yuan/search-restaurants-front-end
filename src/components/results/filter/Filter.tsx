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
};

type FilterProps = {
  filterOptions: { [key: string]: FilterOption[] };
  currentFilter: { [key: string]: string[] };
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
  isLoading: boolean;
};

function Dropdown({
  dropdownName,
  options,
  currentFilter,
  setFilter,
  isDisabled = false,
}: DropdownProps) {
  return (
    <div className="dropdown-container">
      <Select
        name={dropdownName}
        isMulti
        isDisabled={isDisabled}
        placeholder={dropdownName}
        options={options}
        onChange={(e) => {
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
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
