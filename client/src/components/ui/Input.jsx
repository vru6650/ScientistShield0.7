import { forwardRef } from 'react';

const base =
  'flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50';

export const Input = forwardRef(({ className = '', ...props }, ref) => (
  <input ref={ref} className={`${base} ${className}`} {...props} />
));

Input.displayName = 'Input';
