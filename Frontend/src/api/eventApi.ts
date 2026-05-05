import api from "../lib/axios";
import type { Event, EventFormData, EventRequest } from "../types/schemas";

type UpdateEventParams = {
  id: string;
  data: EventFormData;
};

function toEventRequest(data: EventFormData): EventRequest {
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    location: data.location.trim(),
    date: `${data.date}T${data.time}`,
    capacity: Number(data.capacity),
  };
}

export async function getEvents(): Promise<Event[]> {
  const { data } = await api.get<Event[]>("/events");
  return data;
}

export async function createEvent(formData: EventFormData): Promise<Event> {
  const payload = toEventRequest(formData);
  const { data } = await api.post<Event>("/events", payload);
  return data;
}

export async function updateEvent({ id, data: formData }: UpdateEventParams): Promise<Event> {
  const payload = toEventRequest(formData);
  const { data } = await api.put<Event>(`/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/events/${id}`);
}
