import { useEffect, useRef } from "preact/hooks";
import type { ComponentChildren, TargetedEvent } from "preact";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ComponentChildren; // Preact's correct type for children
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Explicitly typing the native cancel event using Preact's types
  const handleCancel = (e: TargetedEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      /* Centering and positioning utility classes added below */
      className="fixed inset-0 m-auto p-0 rounded-lg shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {/* Container inside the dialog to control content width */}
      <div className="w-[calc(100vw-2rem)] sm:w-full sm:max-w-md p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-xl font-semibold leading-6">{title}</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-sm leading-relaxed">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
