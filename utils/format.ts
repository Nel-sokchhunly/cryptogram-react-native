/**
 * Add padding to the seconds to always have 2 digits
 * @param seconds number to format
 * @returns formatted number
 */
export function formatSeconds(seconds: number): string {
  return seconds < 10 ? `0${seconds}` : seconds.toString();
}
