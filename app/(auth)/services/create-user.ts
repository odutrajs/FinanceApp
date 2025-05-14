import { api } from "../../../configs/api";

export type SignUpPayload = {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  confirmarSenha: string;
  paymentRecurrent: "MONTHLY" | "ANNUALLY";
};

export type SignUpResponse = {
  userId: string;
};

export async function createUser(body: SignUpPayload) {
  return api.post<SignUpResponse>(`/user`, body).then(({ data }) => data);
}

export type CreateUserValidationErrors = {
  errors: Partial<Record<keyof SignUpPayload, any>>;
};

export type CreateUserMessageError = {
  message: string;
};
