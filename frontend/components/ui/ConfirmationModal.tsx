import { useEffect } from "react";

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "blue" | "green" | "rose";
};

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title, // Title unused in this specific design, message takes precedence as main text
  message,
  confirmLabel = "Ya, yakin",
  cancelLabel = "Tidak",
  variant = "green",
}: ConfirmationModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const isDanger = variant === "rose";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[400px] overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          {/* Large Icon */}
          <div
            className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full ${
              isDanger ? "bg-rose-100 text-rose-600" : "bg-green-100 text-green-600"
            }`}
          >
            {isDanger ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            )}
          </div>

          {/* Message as Main Title */}
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            {message}
          </h3>

          {/* Buttons */}
          <div className="flex w-full items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-95 ${
                isDanger
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
