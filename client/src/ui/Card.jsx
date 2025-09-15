/* eslint-disable react/prop-types */
import { cn } from './utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-lg border border-border bg-surface shadow-sm', className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-4 border-b border-border', className)} {...props} />;
}

export function CardBody({ className, ...props }) {
  return <div className={cn('p-4', className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('p-4 border-t border-border', className)} {...props} />;
}
