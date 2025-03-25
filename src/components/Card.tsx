
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'elevated';
  onClick?: () => void;
  isHoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  isHoverable = false,
}) => {
  const baseStyles = 'rounded-2xl p-4';
  
  const variantStyles = {
    default: 'bg-white',
    outline: 'border border-gray-200',
    ghost: 'bg-transparent',
    elevated: 'bg-white shadow-md',
  };
  
  const interactiveStyles = onClick ? 'cursor-pointer active:scale-98 transition-transform' : '';
  const hoverStyles = isHoverable ? 'card-hover soft-shadow hover:shadow-md' : '';
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        interactiveStyles,
        hoverStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
