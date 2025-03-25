
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={cn('font-display font-bold', sizeClasses[size], className)}>
      <span className="text-teal-500">Pay</span>
      <span className="text-dark-900">X</span>
    </div>
  );
};

export default Logo;
