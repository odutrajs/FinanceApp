import { api } from "../../../../configs/api";

export async function deleteSharedPhone(phone: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.delete("/user/delete-shared-phone", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { phone },
  });

  return response.data;
}
