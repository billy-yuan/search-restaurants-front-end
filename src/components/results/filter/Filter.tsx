import Select from "react-select";

type FilterOption = {
  value: string;
  display: string;
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
    <>
      <span>{dropdownName}</span>
      <Select
        name={dropdownName}
        isMulti
        isDisabled={isDisabled}
        options={options}
        onChange={(e) => {
          setFilter({
            ...currentFilter,
            [dropdownName]: e.map((option) => option.value),
          });
        }}
      />
    </>
  );
}

function Filter({
  filterOptions,
  currentFilter,
  setFilter,
  isLoading,
}: FilterProps) {
  return (
    <div style={{ margin: "50px" }}>
      <div>Filter</div>
      <div>
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
