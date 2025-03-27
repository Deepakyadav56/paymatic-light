
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StepperContextType {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  steps: string[];
  totalSteps: number;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

interface StepperProviderProps {
  children: ReactNode;
  steps: string[];
}

export const StepperProvider: React.FC<StepperProviderProps> = ({ children, steps }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        steps,
        totalSteps,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = (): StepperContextType => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};
