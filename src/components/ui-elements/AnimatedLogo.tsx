
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="inline-flex overflow-hidden">
        <span className={cn(
          "font-bold tracking-tight animate-fade-in",
          sizeClasses[size]
        )}>
          <span className="text-payx-teal">Pay</span>
          <span className="text-payx-dark">X</span>
        </span>
      </div>
      <div className="ml-1 h-1.5 w-8 bg-gradient-to-r from-payx-teal to-payx-blue rounded-full overflow-hidden">
        <div className="h-full w-full bg-payx-teal animate-progress"></div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
