/* eslint-disable react/prop-types */
import { cn } from './utils';

export default function InputField({
  id,
  label,
  hint,
  error,
  className,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-describedby={describedBy}
        className={cn(
          'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm hocus:ring-2 ring-ring focus:outline-none',
          error && 'border-danger'
        )}
        {...props}
      />
      {hint && (
        <p id={`${inputId}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
