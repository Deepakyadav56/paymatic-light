import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, CreditCard, BarChart4, QrCode } from 'lucide-react';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Define Send variable before using it
  const Send = CreditCard;
  
  const slides = [
    {
      title: 'Welcome to PayX',
      description: 'The easiest way to manage your finances and make payments in seconds.',
      icon: null,
      gradient: 'from-teal-50 to-blue-50',
    },
    {
      title: 'Send Money Fast',
      description: 'Transfer money to friends and family instantly with just a few taps.',
      icon: <Send className="text-teal-500 w-16 h-16 mb-6" />,
      gradient: 'from-teal-50 to-green-50',
    },
    {
      title: 'Grow Your Wealth',
      description: 'Invest in mutual funds and watch your money grow over time.',
      icon: <BarChart4 className="text-green-500 w-16 h-16 mb-6" />,
      gradient: 'from-green-50 to-teal-50',
    },
    {
      title: 'Scan & Pay',
      description: 'Simply scan a QR code to make quick payments anywhere.',
      icon: <QrCode className="text-blue-500 w-16 h-16 mb-6" />,
      gradient: 'from-blue-50 to-teal-50',
    },
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };
  
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const handleSkip = () => {
    navigate('/login');
  };
  
  return (
    <div className={`min-h-screen flex flex-col relative bg-gradient-to-b ${slides[currentSlide].gradient} p-6`}>
      <div className="absolute top-6 right-6">
        {currentSlide < slides.length - 1 ? (
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
        ) : null}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-xs w-full animate-fade-in">
          {currentSlide === 0 ? (
            <Logo size="lg" className="mb-8 mx-auto" />
          ) : (
            slides[currentSlide].icon
          )}
          
          <h1 className="text-3xl font-display font-bold text-dark-900 text-center mb-4">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-center text-dark-600 mb-8">
            {slides[currentSlide].description}
          </p>
          
          <div className="flex justify-center mb-12">
            {slides.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'onboarding-indicator transition-all duration-300',
                  currentSlide === index ? 'active' : ''
                )}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between w-full max-w-xs mx-auto">
        {currentSlide > 0 ? (
          <Button
            variant="outline"
            icon={<ChevronLeft size={18} />}
            onClick={handlePrev}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button
          icon={currentSlide === slides.length - 1 ? undefined : <ChevronRight size={18} />}
          iconPosition="right"
          onClick={handleNext}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
