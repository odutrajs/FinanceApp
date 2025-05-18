import { api } from "../../../../configs/api";

export type UserResponse = {
  profit: number;
  debt: number;
  balance: number;
};

export type GetBalanceUserParams = {
  startDate: string;
  endDate: string;
};

export async function getBalanceUser({
  startDate,
  endDate,
}: GetBalanceUserParams): Promise<UserResponse> {
  const token = localStorage.getItem("token");

  const { data } = await api.get<UserResponse>(
    `/user/balance?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
