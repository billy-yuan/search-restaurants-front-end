import "./style.css";

export function LinkButton({
  url,
  displayText,
}: {
  url: string;
  displayText: string;
}) {
  return (
    <a
      className="link-button"
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {displayText}
    </a>
  );
}
