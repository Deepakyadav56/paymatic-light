
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Fingerprint, User, User2, UserPlus2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { cn } from '@/lib/utils';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSendOTP = () => {
    if (!phone || phone.length < 10 || phone.length > 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify-otp', { state: { phone } });
    }, 1500);
  };
  
  const handleCreateAccount = () => {
    if (!name || !phone || !email || !pin) {
      toast({
        title: "Missing fields",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (phone.length < 10 || phone.length > 10) {
      toast({
        title: "Invalid phone numberrrr",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    if (pin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN should be at least 4 digits",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify-otp', { state: { phone, isSignup: true } });
    }, 1500);
  };
  
  const handleFingerprint = () => {
    toast({
      title: "Biometric authentication",
      description: "Fingerprint authentication requested"
    });
  };


  const navigateToSignUp = () => {
    navigate('/signup');

  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white p-6">
      <div className="mt-10 mb-8 flex justify-center">
        <Logo size="md" />
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex items-center border-b border-gray-200 w-full max-w-xs">
          <button
            className={cn(
              'flex-1 text-center py-3 font-medium',
              activeTab === 'login' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-dark-400'
            )}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          {/* <button
            className={cn(
              'flex-1 text-center py-3 font-medium',
              activeTab === 'signup' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-dark-400'
            )}
            onClick={() => setActiveTab('signup')}
          >
            Signupppp
          </button> */}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center animate-fade-in">
        <div className="w-full max-w-xs">
          {activeTab === 'login' ? (
            <>
              <Input
                label="Phone Number"
                maxLength={10}
                minLength={10}

                placeholder="Enter your phone number"
                icon={<Phone size={18} />}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-6"
              />
              
              <Button
                fullWidth
                onClick={handleSendOTP}
                isLoading={isLoading}
                className="mb-6"
              >
                Send OTP
              </Button>
              
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="px-3 text-dark-400 text-sm">or</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              
             
              
              <Button
                variant="outline"
                fullWidth
                icon={<UserPlus2 size={18} />}
                onClick={navigateToSignUp}
                className="mt-6"
              >
                SignUp
              </Button>
            </>
          ) : (
            <>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
              />
              
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                icon={<Phone size={18} />}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-4"
              />
              
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              
              <Input
                label="Create PIN"
                placeholder="4-digit PIN"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mb-6"
              />
              
              <Button
                fullWidth
                onClick={handleCreateAccount}
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
