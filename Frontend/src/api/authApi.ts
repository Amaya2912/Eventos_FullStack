import api from "../lib/axios";
import type { LoginFormData, RegisterFormData } from "../types/schemas";

export type AuthResponse = {
  token: string;
  nombre?: string;
  email?: string;
};

export async function login({ email, password }: LoginFormData) {
  try {
    const response = await api.post<AuthResponse>("/auth/login", { email: email.trim().toLowerCase(), password });
    return response.data;
  } catch {
    throw new Error("Login failed");
  }
}

export async function register({ name, email, password }: RegisterFormData) {
  try {
    const response = await api.post("/auth/register", { nombre: name, email: email.trim().toLowerCase(), password });
    return response.data;
  } catch {
    throw new Error("Registration failed");
  }
}
