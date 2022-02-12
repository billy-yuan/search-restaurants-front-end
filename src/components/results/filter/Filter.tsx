import { useContext, useEffect } from "react";
import Select from "react-select";
import { capitalizeString } from "../../../utility/capitalizeString";
import { stateContext } from "../../../utility/context/appState";
import "./style.css";

export type FilterOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  dropdownName: string;
  options: FilterOption[];
  isDisabled: boolean;
  onChange: () => void;
};

type FilterProps = {
  filterOptions: { [key: string]: FilterOption[] };
  isLoading: boolean;
  onChange: () => void;
};

function Dropdown({
  dropdownName,
  options,
  isDisabled = false,
  onChange,
}: DropdownProps) {
  const { currentFilter, setCurrentFilter } = useContext(stateContext);
  const selectedOptionsArray = currentFilter[dropdownName];
  const values = options.filter((value) =>
    selectedOptionsArray.includes(value.value)
  );

  // if onChange() goes in the onChange callback, the state won't update.
  // So we have to use useEffect to force this onChange() function to fire.
  useEffect(() => {
    onChange();
  }, [currentFilter]);

  // Get filters from URL on page load
  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    let articleFilter = parsedUrl.searchParams.get("articles")?.split(",");
    let priceFilter = parsedUrl.searchParams.get("price")?.split(",");
    let categoryFilter = parsedUrl.searchParams.get("categories")?.split(",");

    articleFilter = articleFilter ? articleFilter : [];
    priceFilter = priceFilter ? priceFilter : [];
    categoryFilter = categoryFilter ? categoryFilter : [];

    setCurrentFilter({
      ...currentFilter,
      articles: articleFilter,
      price: priceFilter,
      categories: categoryFilter,
    });
  }, []);

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
        }}
      />
    </div>
  );
}

function Filter({
  filterOptions,

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
            isDisabled={isLoading}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
