/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext({ push: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message) => {
      const id = Date.now();
      setToasts((toasts) => [...toasts, { id, message }]);
      setTimeout(() => remove(id), 3000);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ push }}>
      <div
        aria-live="polite"
        className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm shadow-md"
          >
            {toast.message}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
