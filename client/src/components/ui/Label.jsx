import { forwardRef } from 'react';

export const Label = forwardRef(({ className = '', ...props }, ref) => (
  <label ref={ref} className={`text-sm font-medium leading-none ${className}`} {...props} />
));

Label.displayName = 'Label';
