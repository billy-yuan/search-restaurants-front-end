import Select from "react-select";

type DropdownProps = {
  dropdownName: string;
  options: { value: string; display: string }[];
};

type FilterProps = {
  filterOptions: DropdownProps[];
};

const coptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];
function Dropdown({ dropdownName, options }: DropdownProps) {
  return (
    <>
      <span>{dropdownName}</span>
      <Select name="colors" isMulti options={options} />
    </>
  );
}

function Filter({ filterOptions }: FilterProps) {
  return (
    <div style={{ margin: "50px" }}>
      <div>Filter</div>
      <div>
        {filterOptions.map((option) => (
          <Dropdown
            dropdownName={option.dropdownName}
            options={option.options}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
