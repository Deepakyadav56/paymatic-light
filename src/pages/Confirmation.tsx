
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-elements/GlassCard';
import confetti from 'canvas-confetti';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    amount, 
    investmentType, 
    fundName, 
    transactionId 
  } = location.state as { 
    amount: number, 
    investmentType: 'onetime' | 'sip',
    fundName: string,
    transactionId: string
  };

  // Trigger confetti effect on load
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      <div className="flex flex-col items-center text-center mb-6 pt-8">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Investment Successful!</h1>
        <p className="text-gray-600">
          Your {investmentType === 'onetime' ? 'one-time investment' : 'SIP'} has been successfully processed
        </p>
      </div>

      <GlassCard className="mb-6">
        <div className="space-y-4">
          <div className="text-center py-2">
            <p className="text-gray-500 text-sm">Investment Amount</p>
            <h2 className="text-2xl font-bold text-gray-900">₹{amount.toLocaleString()}</h2>
            {investmentType === 'sip' && (
              <p className="text-sm text-gray-500">Monthly</p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Fund</span>
                <span className="font-medium">{fundName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Type</span>
                <span className="capitalize">{investmentType === 'onetime' ? 'One-time Purchase' : 'SIP Setup'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span>{formatDate(new Date())}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Estimated Returns Card */}
      <GlassCard className="mb-6 bg-green-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Start tracking your investment</h3>
            <p className="text-sm text-gray-600">View your portfolio to monitor performance</p>
          </div>
          <Button 
            className="bg-white text-payx-teal border border-payx-teal"
            onClick={() => navigate('/mutual-funds')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Portfolio
          </Button>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button 
          className="w-full  hover:bg-teal-600 text-white"
          onClick={() => navigate('/mutual-funds')}
        >
          Explore More Funds
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-gray-200"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4 mr-2" />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
