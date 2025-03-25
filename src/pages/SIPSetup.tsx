
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Calendar, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

const SIPSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { fund } = location.state || {
    fund: { name: 'Sample Fund', return: 10 }
  };
  
  const [amount, setAmount] = useState(1000);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [startDate, setStartDate] = useState(5);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };
  
  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  const dateOptions = [1, 5, 10, 15, 20, 25];
  
  const goBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    navigate('/investment-success', {
      state: {
        amount,
        investmentType: 'sip',
        frequency,
        startDate,
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Set Up SIP</h1>
      </div>
      
      <div className="p-6">
        <Card variant="outline" className="mb-6">
          <h2 className="text-dark-900 font-medium mb-2">{fund.name}</h2>
          <p className="text-dark-400 text-sm mb-4">Expected returns: {fund.return}% (1Y)</p>
          
          <div className="mb-6">
            <label className="text-dark-600 text-sm mb-2 block">
              Enter monthly amount
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
            <p className="text-dark-400 text-xs">Min. SIP: ₹500</p>
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
        
        <Card variant="outline" className="mb-6">
          <h3 className="font-medium text-dark-900 mb-4">SIP Frequency</h3>
          
          <div className="flex mb-6">
            <button
              className={cn(
                'flex-1 py-2 rounded-l-lg border transition-colors',
                frequency === 'monthly' 
                  ? 'bg-teal-500 text-white border-teal-500' 
                  : 'bg-white text-dark-600 border-gray-200'
              )}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </button>
            <button
              className={cn(
                'flex-1 py-2 rounded-r-lg border transition-colors',
                frequency === 'quarterly' 
                  ? 'bg-teal-500 text-white border-teal-500' 
                  : 'bg-white text-dark-600 border-gray-200'
              )}
              onClick={() => setFrequency('quarterly')}
            >
              Quarterly
            </button>
          </div>
          
          <h3 className="font-medium text-dark-900 mb-4">Start Date</h3>
          
          <div className="grid grid-cols-6 gap-2 mb-4">
            {dateOptions.map((date) => (
              <button
                key={date}
                className={cn(
                  'py-2 text-sm font-medium rounded border',
                  startDate === date
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-dark-600 border-gray-200'
                )}
                onClick={() => setStartDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
          
          <div className="flex items-start bg-amber-50 p-3 rounded-lg">
            <AlertCircle size={16} className="text-amber-500 mr-2 mt-0.5" />
            <p className="text-dark-600 text-xs">
              Your first SIP installment will be processed on {startDate}th {getNextMonth()}.
              Auto-pay will be set up from your primary payment method.
            </p>
          </div>
        </Card>
        
        <Card variant="elevated" className="bg-blue-50 border border-blue-100 mb-6">
          <div className="flex items-center mb-4">
            <Calendar size={20} className="text-teal-500 mr-3" />
            <h3 className="font-medium text-dark-900">SIP Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-dark-600">Amount</span>
              <span className="text-dark-900 font-medium">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-600">Frequency</span>
              <span className="text-dark-900 font-medium capitalize">{frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-600">Start Date</span>
              <span className="text-dark-900 font-medium">{startDate}th {getNextMonth()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-600">Annual Investment</span>
              <span className="text-dark-900 font-medium">
                ₹{frequency === 'monthly' ? amount * 12 : amount * 4}
              </span>
            </div>
          </div>
        </Card>
        
        <Button
          fullWidth
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

// Helper function to get the next month name
const getNextMonth = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentDate = new Date();
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  
  return months[nextMonth.getMonth()];
};

export default SIPSetup;
