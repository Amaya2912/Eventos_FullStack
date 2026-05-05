import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { eventSchema, type EventFormData } from "../types/schemas";

type EventFormProps = {
  isSubmitting: boolean;
  initialValues?: EventFormData;
  resetKey: string;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: (data: EventFormData) => void;
};

const initialValues: EventFormData = {
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  capacity: 1,
};

export default function EventForm({ isSubmitting, initialValues: values = initialValues, resetKey, submitLabel, onCancel, onSubmit }: EventFormProps) {
  const lastResetKey = useRef<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>({
    defaultValues: values,
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    if (lastResetKey.current !== resetKey) {
      lastResetKey.current = resetKey;
      reset(values);
    }
  }, [reset, resetKey, values]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Titulo</label>
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" {...register("title")} />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Ubicacion</label>
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" {...register("location")} />
        {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Fecha</label>
        <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" {...register("date")} />
        {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Hora</label>
        <input type="time" className="w-full rounded-lg border border-gray-300 px-3 py-2" {...register("time")} />
        {errors.time && <p className="mt-1 text-xs text-red-600">{errors.time.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Capacidad</label>
        <input type="number" min="1" className="w-full rounded-lg border border-gray-300 px-3 py-2" {...register("capacity", { valueAsNumber: true })} />
        {errors.capacity && <p className="mt-1 text-xs text-red-600">{errors.capacity.message}</p>}
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-semibold text-indigo-800">Descripcion</label>
        <textarea className="min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2" {...register("description")} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end gap-3 md:col-span-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-5 py-2 font-semibold text-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
