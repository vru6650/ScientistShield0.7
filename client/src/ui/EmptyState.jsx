/* eslint-disable react/prop-types */

export default function EmptyState({ title, description, action }) {
  return (
    <div className="py-10 text-center">
      <h3 className="mt-2 text-sm font-medium text-muted">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
