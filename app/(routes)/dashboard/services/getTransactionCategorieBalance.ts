import { api } from "../../../../configs/api";

export type CategoryBalance = {
  id: string;
  name: string;
  amount: number;
};

type CategoryBalanceResponse = {
  categories: CategoryBalance[];
};

export type GetCategoryBalanceParams = {
  transactionType: "DEBIT" | "CREDIT";
  startDate: string;
  endDate: string;
};

export async function getTransactionCategoriesBalance({
  transactionType,
  startDate,
  endDate,
}: GetCategoryBalanceParams): Promise<CategoryBalance[]> {
  const token = localStorage.getItem("token");

  const { data } = await api.get<CategoryBalanceResponse>(
    `/api/v1/transaction/category/balance?transactionType=${transactionType}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.categories;
}
