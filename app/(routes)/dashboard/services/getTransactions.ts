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
  registeredBy?: string;
};

export type GetTransactionsParams = {
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
  registeredBy: string;
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
  registeredBy,
}: GetTransactionsParams): Promise<GetTransactionsResponse> {
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    startDate,
    endDate,
  });

  if (registeredBy) {
    queryParams.append("registeredBy", registeredBy);
  }

  const { data } = await api.get<GetTransactionsResponse>(
    `/api/v1/transaction?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
