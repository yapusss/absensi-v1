"use client";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  showButton?: boolean;
  buttonAriaLabel?: string;
  onButtonClick?: () => void;
};

export function SearchBar({
  placeholder = "Cari data",
  className = "",
  inputClassName = "",
  value,
  onChange,
  showButton = false,
  buttonAriaLabel = "Cari",
  onButtonClick,
}: SearchBarProps) {
  const wrapperClass = `flex min-w-0 w-full items-center rounded-lg border border-slate-200 bg-white shadow-sm h-10 ${
    showButton ? "pl-3 pr-0" : "px-3"
  } ${className}`.trim();
  const fieldClass =
    "h-full w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400";

  return (
    <div className={wrapperClass}>
      <span className="mr-2 text-slate-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        className={`${fieldClass} ${inputClassName}`.trim()}
      />
      {showButton ? (
<button
  type="button"
  className="grid h-10 w-10 place-items-center rounded-tr-md rounded-br-md bg-blue-500 text-white shadow-sm hover:bg-blue-600"
  aria-label="Cari"
>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
