import { ButtonHTMLAttributes, forwardRef } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "slate" | "rose" | "blue";
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className = "", variant = "slate", ...props }, ref) => {
    const variantStyles = {
      slate:
        "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700",
      rose: "border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700",
      blue: "border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`grid h-8 w-8 place-items-center rounded-full border transition ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

ActionButton.displayName = "ActionButton";
