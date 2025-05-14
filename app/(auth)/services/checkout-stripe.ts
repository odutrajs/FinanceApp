import { api } from "../../../configs/api";

export async function createStripeSession(
  userId: string,
  paymentRecurrent: string
): Promise<{ sessionUrl: string }> {
  console.log(userId);
  const response = await api.post("/payment/create-session", {
    userId,
    paymentRecurrent,
  });
  return response.data;
}
