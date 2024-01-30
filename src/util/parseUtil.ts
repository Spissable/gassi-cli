export function parseInput(input: string): string | number | boolean {
  const numericInput = parseInt(input);
  if (numericInput) {
    return numericInput;
  }

  const lowerCaseInput = input.toLowerCase();
  if (lowerCaseInput === 'true' || lowerCaseInput === 'false') {
    return lowerCaseInput === 'true';
  }

  return input;
}
