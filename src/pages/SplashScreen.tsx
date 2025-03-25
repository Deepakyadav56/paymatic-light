
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="animate-fade-in flex flex-col items-center">
        <Logo size="lg" className="mb-8" />
        <p className="text-dark-400 mb-6">Loading...</p>
        <div className="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
