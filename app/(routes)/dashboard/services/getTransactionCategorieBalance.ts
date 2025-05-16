import { api } from "../../../../configs/api";

export type CategoryBalance = {
  id: string;
  name: string;
  amount: number;
};

type CategoryBalanceResponse = {
  categories: CategoryBalance[];
};

export async function getTransactionCategoriesBalance(
  transactionType: "DEBIT" | "CREDIT"
): Promise<CategoryBalance[]> {
  const token = localStorage.getItem("token");

  const { data } = await api.get<CategoryBalanceResponse>(
    `/api/v1/transaction/category/balance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        transactionType,
      },
    }
  );

  return data.categories;
}
