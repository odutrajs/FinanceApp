import { api } from "../../../configs/api";

export async function createStripeSession(
  userId: string,
  paymentRecurrent: string
): Promise<{ sessionUrl: string }> {
  console.log(userId);
  const response = await api.post("/api/v1/payment/create-session", {
    userId,
    paymentRecurrent,
  });
  return response.data;
}
