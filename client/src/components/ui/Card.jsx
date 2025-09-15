export function Card({ className = '', ...props }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`mb-4 ${className}`} {...props} />;
}

export function CardTitle({ className = '', ...props }) {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }) {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props} />
  );
}

export function CardContent({ className = '', ...props }) {
  return <div className={className} {...props} />;
}
