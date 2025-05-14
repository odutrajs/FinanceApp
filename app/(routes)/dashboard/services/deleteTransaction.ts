import { api } from "../../../../configs/api";

export async function deleteTransaction(transactionId: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  return api.delete(`/transaction/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
