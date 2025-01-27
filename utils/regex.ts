export function isCharAlphabet(char: string): boolean {
  return /^[a-zA-Z]$/.test(char);
}

export function isCharWhitespace(char: string): boolean {
  return /^\s$/.test(char);
}
