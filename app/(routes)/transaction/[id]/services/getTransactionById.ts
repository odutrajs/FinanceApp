import { api } from "../../../../../configs/api";
import { TransactionForm } from "../page";

export async function getTransactionById(
  transactionId: string
): Promise<TransactionForm> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.get(`/api/v1/transaction/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
