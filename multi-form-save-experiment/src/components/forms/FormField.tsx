import type { ReactNode, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, required, hint, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {hint && (
        <p className="mb-1 text-sm text-gray-500" id={`${htmlFor}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${htmlFor}-error`} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError, className = '', ...props },
  ref
) {
  const baseClasses =
    'block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0';
  const stateClasses = hasError
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  return (
    <input
      ref={ref}
      className={`${baseClasses} ${stateClasses} ${className}`}
      aria-invalid={hasError}
      {...props}
    />
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError, options, className = '', ...props },
  ref
) {
  const baseClasses =
    'block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0';
  const stateClasses = hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  return (
    <select
      ref={ref}
      className={`${baseClasses} ${stateClasses} ${className}`}
      aria-invalid={hasError}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className = '', ...props },
  ref
) {
  return (
    <label className={`inline-flex items-center ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
});
