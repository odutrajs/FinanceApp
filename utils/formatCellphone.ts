export const formatCellphone = (value: string): string => {
  if (!value) return "";
  return "55" + value.replace(/\D/g, "");
};
