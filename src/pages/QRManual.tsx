
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useToast } from '@/hooks/use-toast';

const QRManual: React.FC = () => {
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!qrCode) {
      toast({
        title: "Missing Code",
        description: "Please enter a QR code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      navigate('/payment-success', {
        state: {
          amount: '99',
          recipient: {
            name: 'Online Store',
            upiId: 'store@upi'
          },
          type: 'qr'
        }
      });
    }, 1500);
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 relative border-b border-gray-100">
        <button
          className="absolute top-12 left-6 p-2"
          onClick={goBack}
        >
          <ChevronLeft size={24} />
        </button>
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Enter QR Code</h1>
      </div>
      
      <div className="p-6">
        <p className="text-dark-600 mb-6 text-center">
          Enter the QR code manually if the scanner is not working
        </p>
        
        <Input
          placeholder="Enter UPI ID or QR code"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          className="mb-8"
        />
        
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={goBack}
          >
            Back
          </Button>
          
          <Button
            className="flex-1"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRManual;
