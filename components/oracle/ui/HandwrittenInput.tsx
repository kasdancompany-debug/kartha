import { forwardRef, type InputHTMLAttributes } from "react";

export interface HandwrittenInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
}

/** Part D.3 Hero step — "a handwritten line on paper (no box)": a real input, just a baseline. */
export const HandwrittenInput = forwardRef<HTMLInputElement, HandwrittenInputProps>(function HandwrittenInput(
  { label, error, id, ...props },
  ref,
) {
  const inputId = id ?? "hero-name";
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[var(--fs-label)] uppercase tracking-label text-ink/60">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        type="text"
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="border-0 border-b-2 border-ink/30 bg-transparent px-1 py-2 font-serif text-[var(--fs-h1)] text-ink outline-none focus:border-kattha"
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-[var(--fs-label)] text-laterite">
          {error}
        </p>
      )}
    </div>
  );
});
