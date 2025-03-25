
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col space-y-1', fullWidth ? 'w-full' : '')}>
        {label && (
          <label className="text-sm font-medium text-dark-800">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'rounded-xl px-4 py-2.5 border border-gray-300 text-dark-900 placeholder:text-dark-400 focus:outline-none input-focus',
              icon ? 'pl-10' : '',
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : '',
              fullWidth ? 'w-full' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
