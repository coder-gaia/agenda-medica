import { api } from "./api";

export async function getAppointments(search?: string) {
  const response = await api.get("/appointments", {
    params: {
      search,
    },
  });

  return response.data;
}