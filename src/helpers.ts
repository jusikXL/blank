export function toConstantCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();
}
