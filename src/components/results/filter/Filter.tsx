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
};

type FilterProps = {
  filterOptions: { [key: string]: FilterOption[] };
  currentFilter: { [key: string]: string[] };
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
};

function Dropdown({
  dropdownName,
  options,
  currentFilter,
  setFilter,
}: DropdownProps) {
  return (
    <>
      <span>{dropdownName}</span>
      <Select
        name={dropdownName}
        isMulti
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

function Filter({ filterOptions, currentFilter, setFilter }: FilterProps) {
  return (
    <div style={{ margin: "50px" }}>
      <div>Filter</div>
      <div>
        {Object.keys(filterOptions).map((option) => (
          <Dropdown
            dropdownName={option}
            options={filterOptions[option]}
            currentFilter={currentFilter}
            setFilter={setFilter}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
