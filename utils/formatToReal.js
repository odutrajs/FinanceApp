export function formatToBRL(value) {
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "Valor inválido";
  }
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
