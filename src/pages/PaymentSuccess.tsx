
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Share2, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import confetti from 'canvas-confetti';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { amount, recipient, note, type } = location.state || {
    amount: '50',
    recipient: { name: 'John Smith' },
    type: 'send'
  };
  
  useEffect(() => {
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);
  
  const getTitle = () => {
    switch (type) {
      case 'send':
        return `₹${amount} sent to ${recipient.name}`;
      case 'request':
        return `₹${amount} requested from ${recipient.name}`;
      case 'qr':
        return `₹${amount} paid to ${recipient.name}`;
      default:
        return 'Payment Successful';
    }
  };
  
  const goHome = () => {
    navigate('/home');
  };
  
  const shareReceipt = () => {
    // Placeholder for share functionality
    console.log('Share receipt');
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          
          <h1 className="text-2xl font-display font-bold text-dark-900 mb-2">
            {getTitle()}
          </h1>
          
          <p className="text-dark-600 text-sm mb-12">
            Transaction completed at {new Date().toLocaleTimeString()}
          </p>
          
          <div className="border-t border-gray-100 pt-6 max-w-xs mx-auto w-full">
            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-dark-600">Date</span>
                <span className="text-dark-900 font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-dark-600">Time</span>
                <span className="text-dark-900 font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-dark-600">Transaction ID</span>
                <span className="text-dark-900 font-medium">TX1234...5678</span>
              </div>
              
              {note && (
                <div className="flex justify-between">
                  <span className="text-dark-600">Note</span>
                  <span className="text-dark-900 font-medium">{note}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                icon={<Share2 size={18} />}
                onClick={shareReceipt}
              >
                Share Receipt
              </Button>
              
              <Button
                fullWidth
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={goHome}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
