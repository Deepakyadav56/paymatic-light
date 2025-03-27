
import React, { useEffect, useRef } from 'react';
import { useStepper } from './StepperContext';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ className }) => {
  const { currentStep, goToStep, steps, totalSteps } = useStepper();
  const stepperRef = useRef<HTMLDivElement>(null);

  // Ensure stepper is visible on mobile by scrolling to current step
  useEffect(() => {
    if (stepperRef.current) {
      const stepElement = stepperRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (stepElement) {
        const scrollLeft = stepElement.getBoundingClientRect().left + 
                          stepperRef.current.scrollLeft - 
                          stepperRef.current.getBoundingClientRect().left - 
                          100; // Center it
        stepperRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  return (
    <div 
      ref={stepperRef}
      className={cn(
        "w-full overflow-x-auto flex items-center justify-start py-6 px-4 md:justify-center scrollbar-hide",
        className
      )}
    >
      <div className="inline-flex items-center min-w-max">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={`step-${stepNumber}`}>
              {/* Step indicator */}
              <div 
                data-step={stepNumber}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => isCompleted && goToStep(stepNumber)}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 border-2",
                    isActive && "border-payx-teal text-payx-teal bg-white scale-110 shadow-md",
                    isCompleted && "border-payx-teal bg-payx-teal text-white cursor-pointer",
                    !isActive && !isCompleted && "border-gray-300 text-gray-400 bg-white"
                  )}
                  disabled={!isCompleted}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </button>
                <span 
                  className={cn(
                    "mt-2 text-xs whitespace-nowrap transition-all duration-300",
                    isActive && "text-payx-teal font-medium",
                    isCompleted && "text-payx-teal",
                    !isActive && !isCompleted && "text-gray-400"
                  )}
                >
                  {step}
                </span>
              </div>
              
              {/* Line connector between steps */}
              {stepNumber < totalSteps && (
                <div 
                  className={cn(
                    "w-12 md:w-20 h-0.5 mx-1 transition-all duration-500",
                    isCompleted ? "bg-payx-teal" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
