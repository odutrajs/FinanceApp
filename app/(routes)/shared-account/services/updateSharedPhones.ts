import { api } from "../../../../configs/api";

export async function updateSharedPhones(data: { sharedWithPhones: string[] }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.put("/user/update-shared-phones", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
