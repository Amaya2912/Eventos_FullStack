import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import EventForm from "./EventForm";
import type { EventFormData } from "../types/schemas";

type EventModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  initialValues?: EventFormData;
  mode: "create" | "edit";
  resetKey: string;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
};

export default function EventModal({ isOpen, isSubmitting, initialValues, mode, resetKey, onClose, onSubmit }: EventModalProps) {
  const isEditing = mode === "edit";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-5">
            <DialogTitle className="text-2xl font-bold text-indigo-900">
              {isEditing ? "Editar evento" : "Crear evento"}
            </DialogTitle>
            <p className="mt-1 text-sm text-gray-600">
              {isEditing
                ? "Actualiza la informacion del evento seleccionado."
                : "Completa la informacion para registrar un nuevo evento."}
            </p>
          </div>

          <EventForm
            isSubmitting={isSubmitting}
            initialValues={initialValues}
            resetKey={resetKey}
            submitLabel={isEditing ? "Guardar cambios" : "Crear evento"}
            onCancel={onClose}
            onSubmit={onSubmit}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
