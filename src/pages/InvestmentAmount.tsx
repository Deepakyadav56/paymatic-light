
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, HelpCircle, Repeat, Calendar } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

// Sample data for the fund details
const fundsData = [
  {
    id: 1,
    name: 'Blue Chip Growth Fund',
    category: 'equity',
    return: 15.2,
  },
  {
    id: 2,
    name: 'Income Bond Fund',
    category: 'debt',
    return: 8.7,
  },
  {
    id: 3,
    name: 'Balanced Advantage Fund',
    category: 'hybrid',
    return: 10.9,
  },
  {
    id: 4,
    name: 'Nifty 50 Index Fund',
    category: 'index',
    return: 14.5,
  },
];

const InvestmentAmount: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState(1000);
  const [investmentType, setInvestmentType] = useState<'lumpsum' | 'sip'>('lumpsum');
  
  const navigate = useNavigate();
  
  const fundId = parseInt(id || '1');
  const fund = fundsData.find(f => f.id === fundId) || fundsData[0];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };
  
  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  
  const estimatedReturns = calculateEstimatedReturns(amount, fund.return);
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToPaymentMethod = () => {
    navigate(`/payment-method/${fund.id}`, {
      state: {
        amount,
        investmentType,
        fund,
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 relative border-b border-gray-100">
        <button
          className="absolute top-12 left-6 p-2"
          onClick={goBack}
        >
          <ChevronLeft size={24} />
        </button>
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Investment Amount</h1>
      </div>
      
      <div className="p-6">
        <Card variant="outline" className="mb-6">
          <h2 className="text-dark-900 font-medium mb-2">{fund.name}</h2>
          <p className="text-dark-400 text-sm mb-4">Expected returns: {fund.return}% (1Y)</p>
          
          <div className="flex mb-4">
            <button
              className={cn(
                'flex-1 py-2 rounded-l-lg border transition-colors',
                investmentType === 'lumpsum' 
                  ? 'bg-teal-500 text-white border-teal-500' 
                  : 'bg-white text-dark-600 border-gray-200'
              )}
              onClick={() => setInvestmentType('lumpsum')}
            >
              One Time
            </button>
            <button
              className={cn(
                'flex-1 py-2 rounded-r-lg border transition-colors',
                investmentType === 'sip' 
                  ? 'bg-teal-500 text-white border-teal-500' 
                  : 'bg-white text-dark-600 border-gray-200'
              )}
              onClick={() => setInvestmentType('sip')}
            >
              SIP
            </button>
          </div>
          
          <div className="mb-6">
            <label className="text-dark-600 text-sm mb-2 block">
              Enter {investmentType === 'lumpsum' ? 'investment' : 'monthly'} amount
            </label>
            <div className="flex items-center border-b-2 border-gray-200 py-2 mb-1">
              <span className="text-dark-900 text-2xl font-medium mr-2">₹</span>
              <input
                type="number"
                className="text-2xl font-medium text-dark-900 flex-1 focus:outline-none bg-transparent"
                value={amount}
                onChange={handleAmountChange}
                min={100}
                step={100}
              />
            </div>
            <p className="text-dark-400 text-xs">Min. {investmentType === 'lumpsum' ? 'investment' : 'SIP'}: ₹500</p>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-6">
            {predefinedAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                className={cn(
                  'py-2 text-sm font-medium rounded border',
                  amount === presetAmount
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-dark-600 border-gray-200'
                )}
                onClick={() => setAmount(presetAmount)}
              >
                ₹{presetAmount}
              </button>
            ))}
          </div>
        </Card>
        
        <Card variant="elevated" className="bg-blue-50 border border-blue-100 mb-6">
          <h3 className="font-medium text-dark-900 mb-3">Projected Returns</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-dark-400 text-xs mb-1">Investment</p>
              <p className="text-dark-900 font-medium">
                ₹{investmentType === 'lumpsum' ? amount : amount * 12}
                {investmentType === 'sip' && <span className="text-dark-400 text-xs"> /year</span>}
              </p>
            </div>
            <div>
              <p className="text-dark-400 text-xs mb-1">Est. Returns (1Y)</p>
              <p className="text-green-500 font-medium">+₹{estimatedReturns}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-dark-900 font-medium">Est. Value (1Y)</p>
                <HelpCircle size={14} className="text-dark-400 ml-1" />
              </div>
              <p className="text-dark-900 font-medium">
                ₹{investmentType === 'lumpsum' 
                  ? Math.round(amount + estimatedReturns) 
                  : Math.round(amount * 12 + estimatedReturns)}
              </p>
            </div>
          </div>
        </Card>
        
        {investmentType === 'sip' && (
          <Card variant="outline" className="mb-6">
            <h3 className="font-medium text-dark-900 mb-4">SIP Details</h3>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <Calendar size={20} className="text-teal-500" />
              </div>
              <div>
                <p className="text-dark-900 font-medium">Monthly Investment</p>
                <p className="text-dark-400 text-sm">5th of every month</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <Repeat size={20} className="text-teal-500" />
              </div>
              <div>
                <p className="text-dark-900 font-medium">Auto-debit</p>
                <p className="text-dark-400 text-sm">From your primary account</p>
              </div>
            </div>
          </Card>
        )}
        
        <Button
          fullWidth
          onClick={goToPaymentMethod}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Helper function to calculate estimated returns
const calculateEstimatedReturns = (amount: number, returnRate: number) => {
  // Simple calculation for demonstration
  return Math.round(amount * (returnRate / 100));
};

export default InvestmentAmount;
