import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { capitalizeString } from "../../../utility/capitalizeString";
import { stateContext } from "../../../utility/context/appState";
import { buildFetchDataUrl } from "../helper";
import { mapBoundsToString } from "../utility";
import "./style.css";

export type FilterOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  dropdownName: string;
  options: FilterOption[];
  isDisabled: boolean;
};

type FilterProps = {
  filterOptions: { [key: string]: FilterOption[] };
  isLoading: boolean;
};

function Dropdown({
  dropdownName,
  options,
  isDisabled = false,
}: DropdownProps) {
  const {
    map,
    searchQuery,
    setShouldFetchData,
    currentFilter,
    setCurrentFilter,
  } = useContext(stateContext);
  const selectedOptionsArray = currentFilter[dropdownName];
  const values = options.filter((value) =>
    selectedOptionsArray.includes(value.value)
  );
  const navigate = useNavigate();
  const [filterChange, setFilterChange] = useState(0);

  const updateUrlAndRedirect = () => {
    const mapBounds = mapBoundsToString(map);
    const url = buildFetchDataUrl(searchQuery, currentFilter, mapBounds);
    setShouldFetchData(true);
    navigate(`/results?${url.encodeParameters()}`);
  };

  // Update URL and redirect to it when filters change
  useEffect(() => {
    if (filterChange > 0) {
      updateUrlAndRedirect();
    }
  }, [filterChange]);

  return (
    <div className="dropdown-container">
      <Select
        name={dropdownName}
        isMulti={false}
        isDisabled={isDisabled}
        placeholder={capitalizeString(dropdownName)}
        options={options}
        value={values}
        isClearable={true}
        onChange={(e) => {
          const newValue = e ? [e.value] : [];
          setCurrentFilter({
            ...currentFilter,
            [dropdownName]: newValue,
          });
          setFilterChange(filterChange + 1);
        }}
      />
    </div>
  );
}

function Filter({ filterOptions, isLoading }: FilterProps) {
  return (
    <div className="filter-container">
      <div className="dropdowns-container">
        {Object.keys(filterOptions).map((option) => (
          <Dropdown
            key={`dropdown-${option}`}
            dropdownName={option}
            options={filterOptions[option]}
            isDisabled={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
