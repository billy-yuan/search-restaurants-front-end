export function capitalizeString(s: string) {
  if (s === "") {
    return s;
  }

  const firstChar = s[0];
  const firstCharUpper = firstChar.toUpperCase();
  const remainingString = s.slice(1);
  return `${firstCharUpper}${remainingString}`;
}
