// src/app/dashboard/services/createCategory.ts
import { api } from "../../../../configs/api";

export async function createCategory(name: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.post(
    "/api/v1/categorie",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
