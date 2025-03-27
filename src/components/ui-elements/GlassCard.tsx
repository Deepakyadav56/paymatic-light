
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverEffect = false,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-elevated hover:-translate-y-1 cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
