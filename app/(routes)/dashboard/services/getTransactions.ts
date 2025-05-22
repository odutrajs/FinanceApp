import { api } from "../../../../configs/api";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "DEBIT" | "CREDIT";
  categoryName: string;
  transactionAt: string;
  identifier: string;
  categoryColor: string;
};

export type GetTransactionsParams = {
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
};

export type GetTransactionsResponse = {
  transactions: Transaction[];
  hasNextPage: boolean;
};

export async function getTransactions({
  page,
  limit,
  startDate,
  endDate,
}: GetTransactionsParams): Promise<GetTransactionsResponse> {
  const token = localStorage.getItem("token");

  const { data } = await api.get<GetTransactionsResponse>(
    `/api/v1/transaction?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
