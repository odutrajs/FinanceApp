import { api } from "../../../../configs/api";

export async function getCategories() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await api.get("/api/v1/categorie", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.categories;
}
