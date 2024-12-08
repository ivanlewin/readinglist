export function isValidISBN(value: string) {
  const isbn10Regex = /^(?:\d[\ |-]?){9}[\d|X]$/;
  const isbn13Regex = /^(?:\d[\ |-]?){13}$/;
  return isbn10Regex.test(value) || isbn13Regex.test(value);
}
