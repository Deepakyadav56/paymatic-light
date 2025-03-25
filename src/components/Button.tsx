
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center active:scale-95';
  
  const variantStyles = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 shadow-sm',
    secondary: 'bg-gray-100 text-dark-800 hover:bg-gray-200 active:bg-gray-300',
    outline: 'border border-gray-300 text-dark-800 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-dark-800 hover:bg-gray-100 active:bg-gray-200',
    destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const loadingStyles = isLoading ? 'opacity-80 cursor-not-allowed' : '';
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        loadingStyles,
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      
      {children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
