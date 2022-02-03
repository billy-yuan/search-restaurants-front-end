import { Link, Navigate, useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/results");
  };

  return (
    <>
      <form method="/get" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Search for a restaurant
          <input type="text" />
        </label>
        <button type="submit" value="Submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar;
