import { apiWithoutWinterceptors } from "../../../configs/apiWithoutInterceptors";

export type UserMeResponse = {
  id: string;
  name: string;
  email: string;
  sharedWithPhones?: [];
};

export async function getMe(): Promise<UserMeResponse> {
  const token = localStorage.getItem("token");

  const { data } = await apiWithoutWinterceptors.get<UserMeResponse>(
    "/user/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
