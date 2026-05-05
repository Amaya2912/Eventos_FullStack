import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("El email debe ser valido"),
  password: z.string().min(1, "La contrasena es requerida"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El email debe ser valido"),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
});

export const eventSchema = z.object({
  title: z.string().min(1, "El titulo es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  location: z.string().min(1, "La ubicacion es requerida"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().min(1, "La hora es requerida"),
  capacity: z.number().min(1, "La capacidad debe ser mayor a 0"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type EventFormData = z.infer<typeof eventSchema>;

export type EventRequest = {
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
};

export type Event = EventRequest & {
  id: string;
  createdByEmail: string;
};
