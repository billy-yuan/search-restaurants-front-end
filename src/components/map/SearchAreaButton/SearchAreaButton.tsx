import "./style.css";
type SearchAreaButtonProps = {
  callback: () => void;
};

export function SearchAreaButton({ callback }: SearchAreaButtonProps) {
  return (
    <div className="search-area-button-container">
      <div className="search-area-button" onClick={() => callback}>
        Redo search in map
      </div>
    </div>
  );
}
