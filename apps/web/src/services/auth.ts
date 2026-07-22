import { api } from "./api";

type LoginPayload = {
  login: string;
  password: string;
};

export async function loginRequest(payload: LoginPayload) {
  const response = await api.post("/login", payload);

  return response.data;
}