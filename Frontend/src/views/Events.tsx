import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createEvent, deleteEvent, getEvents, updateEvent } from "../api/eventApi";
import EventModal from "../components/EventModal";
import type { Event, EventFormData } from "../types/schemas";
import { formatEventDateTimeText, toEventFormDateTime } from "../utils/date";

export default function Events() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const queryClient = useQueryClient();

  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (createdEvent) => {
      queryClient.setQueryData<Event[]>(["events"], (currentEvents = []) => [
        createdEvent,
        ...currentEvents,
      ]);
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Evento creado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo crear el evento.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (_, deletedEventId) => {
      queryClient.setQueryData<Event[]>(["events"], (currentEvents = []) =>
        currentEvents.filter((event) => event.id !== deletedEventId)
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Evento eliminado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo eliminar el evento.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData<Event[]>(["events"], (currentEvents = []) =>
        currentEvents.map((event) =>
          event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
        )
      );
      setEventToEdit(null);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Evento actualizado correctamente.");
    },
    onError: (error) => {
      console.error("Update event failed", error);
      toast.error("No se pudo actualizar el evento.");
    },
  });

  const handleCreateEvent = (data: EventFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateEvent = (data: EventFormData) => {
    if (!eventToEdit) {
      return;
    }

    updateMutation.mutate({ id: eventToEdit.id, data });
  };

  const editInitialValues = useMemo(() => {
    if (!eventToEdit) {
      return undefined;
    }

    return {
      title: eventToEdit.title,
      description: eventToEdit.description,
      location: eventToEdit.location,
      ...toEventFormDateTime(eventToEdit.date),
      capacity: eventToEdit.capacity,
    };
  }, [eventToEdit]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">Eventos</h1>
          <p className="mt-2 text-gray-600">Gestiona los eventos registrados en la plataforma.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Crear evento
        </button>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-indigo-900">Listado</h2>

        {isLoading && <p className="text-gray-600">Cargando eventos...</p>}
        {isError && <p className="text-red-600">No se pudieron cargar los eventos.</p>}

        {!isLoading && !isError && events.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
            No hay eventos registrados todavia.
          </div>
        )}

        <div className="grid gap-3">
          {events.map((event) => (
            <article key={event.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-bold text-indigo-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-500">{event.location} - {formatEventDateTimeText(event.date)}</p>
                  <p className="text-sm text-gray-500">Capacidad: {event.capacity}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEventToEdit(event)}
                    className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(event.id)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <EventModal
        isOpen={isCreateModalOpen}
        isSubmitting={createMutation.isPending}
        mode="create"
        resetKey={isCreateModalOpen ? "create-open" : "create-closed"}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      <EventModal
        isOpen={Boolean(eventToEdit)}
        isSubmitting={updateMutation.isPending}
        initialValues={editInitialValues}
        mode="edit"
        resetKey={eventToEdit?.id ?? "edit-empty"}
        onClose={() => setEventToEdit(null)}
        onSubmit={handleUpdateEvent}
      />
    </div>
  );
}
