
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Button from '@/components/Button';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { phone, isSignup } = location.state || { phone: '', isSignup: false };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: `A new OTP has been sent to ${phone}`
    });
    setTimer(30);
  };
  
  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 1500);
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white p-6">
      <button
        className="absolute top-6 left-6 p-2"
        onClick={goBack}
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full max-w-xs">
          <h1 className="text-2xl font-display font-bold text-dark-900 text-center mb-2">
            Enter OTP
          </h1>
          
          <p className="text-center text-dark-600 mb-8">
            We've sent a verification code to <span className="font-medium">+91 {phone}</span>
          </p>
          
          <div className="flex justify-between mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-11 h-14 rounded-lg border border-gray-300 text-center text-xl font-medium input-focus"
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <Button
            fullWidth
            onClick={handleVerify}
            isLoading={isLoading}
            className="mb-6"
          >
            Verify
          </Button>
          
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-dark-600">
                Resend OTP in <span className="font-medium">{timer}s</span>
              </p>
            ) : (
              <button
                className="text-teal-500 font-medium"
                onClick={handleResendOTP}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
