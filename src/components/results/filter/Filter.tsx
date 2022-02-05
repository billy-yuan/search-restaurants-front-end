type DropdownProps = {
  dropdownName: string;
  options: { value: string; display: string }[];
};

type FilterProps = {
  filterOptions: DropdownProps[];
};

function Dropdown({ dropdownName, options }: DropdownProps) {
  console.log(options);
  return (
    <>
      <div>{dropdownName}</div>
      <select>
        {options.map((option) => (
          <option value={option.value}>{option.display}</option>
        ))}
      </select>
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
