
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Share2, ArrowRight, BarChart4 } from 'lucide-react';
import Button from '@/components/Button';
import confetti from 'canvas-confetti';

const InvestmentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { amount, investmentType, fund, frequency, startDate } = location.state || {
    amount: 1000,
    investmentType: 'lumpsum',
    fund: { name: 'Sample Fund', return: 10 },
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
    if (investmentType === 'lumpsum') {
      return `₹${amount} invested in ${fund.name}`;
    } else {
      return `SIP of ₹${amount} started in ${fund.name}`;
    }
  };
  
  const goHome = () => {
    navigate('/home');
  };
  
  const goToFunds = () => {
    navigate('/funds');
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
            Investment completed at {new Date().toLocaleTimeString()}
          </p>
          
          <div className="border-t border-gray-100 pt-6 max-w-xs mx-auto w-full">
            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-dark-600">Fund Name</span>
                <span className="text-dark-900 font-medium">{fund.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-dark-600">Amount</span>
                <span className="text-dark-900 font-medium">₹{amount}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-dark-600">Investment Type</span>
                <span className="text-dark-900 font-medium capitalize">{investmentType}</span>
              </div>
              
              {investmentType === 'sip' && frequency && (
                <div className="flex justify-between">
                  <span className="text-dark-600">Frequency</span>
                  <span className="text-dark-900 font-medium capitalize">{frequency}</span>
                </div>
              )}
              
              {investmentType === 'sip' && startDate && (
                <div className="flex justify-between">
                  <span className="text-dark-600">Debit Date</span>
                  <span className="text-dark-900 font-medium">{startDate}th of every month</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-dark-600">Transaction ID</span>
                <span className="text-dark-900 font-medium">INV1234...5678</span>
              </div>
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
                variant="outline"
                fullWidth
                icon={<BarChart4 size={18} />}
                onClick={goToFunds}
              >
                View Investments
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

export default InvestmentSuccess;
