import { useMutation } from "@tanstack/react-query";
import { createStripeSession } from "../services/checkout-stripe";

type CreateStripeSessionInput = {
  userId: string;
  paymentRecurrent: string;
};

export function useCreateStripeSession() {
  return useMutation({
    mutationFn: (input: CreateStripeSessionInput) =>
      createStripeSession(input.userId, input.paymentRecurrent),
  });
}
