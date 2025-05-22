import { api } from "../../../../../configs/api";
import { TransactionForm } from "../page";

export async function updateTransaction({
  id,
  ...data
}: TransactionForm & { id: string }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.put(`/api/v1/transaction/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
