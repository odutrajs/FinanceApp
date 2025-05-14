import { api } from "../../../../configs/api";

export type UserResponse = {
  profit: number;
  debt: number;
  balance: number;
};

export async function getBalanceUser(): Promise<UserResponse> {
  const token = localStorage.getItem("token");
  const { data } = await api.get<UserResponse>("/user/balance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
