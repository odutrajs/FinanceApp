import { api } from "../../../configs/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function loginUser(body: LoginPayload) {
  return api.post<LoginResponse>("/user/login", body).then(({ data }) => data);
}

export type LoginValidationErrors = {
  errors: Partial<Record<keyof LoginPayload, any>>;
};

export type LoginMessageError = {
  error: string;
};
