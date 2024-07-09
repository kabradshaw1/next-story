export function generateRandomTitle(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    if (i === 0 || result.charAt(i - 1) === ' ') {
      result += characters
        .charAt(Math.floor(Math.random() * charactersLength))
        .toUpperCase();
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  // Replace any hyphens with spaces and ensure first letters are capitalized
  return result
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
