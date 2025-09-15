/* eslint-disable react/prop-types */
import { cn } from './utils';

export default function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-muted/20', className)} />;
}
