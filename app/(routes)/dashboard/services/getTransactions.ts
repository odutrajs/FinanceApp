import { api } from "../../../../configs/api";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "DEBIT" | "CREDIT";
  categoryName: string;
  transactionAt: string;
  identifier: string;
};

type GetTransactionsParams = {
  page: number;
  limit: number;
};

export async function getTransactions({
  page,
  limit,
}: GetTransactionsParams): Promise<Transaction[]> {
  const token = localStorage.getItem("token");

  const { data } = await api.get<{ transactions: Transaction[] }>(
    `/transaction?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.transactions;
}
