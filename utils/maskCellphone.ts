export function maskCellphone(value: string): string {
  const numeric = value.replace(/\D/g, "").slice(0, 11);
  if (numeric.length <= 2) return `(${numeric}`;
  if (numeric.length <= 7)
    return `(${numeric.slice(0, 2)}) ${numeric.slice(2)}`;
  return `(${numeric.slice(0, 2)}) ${numeric.slice(2, 7)}-${numeric.slice(7)}`;
}
