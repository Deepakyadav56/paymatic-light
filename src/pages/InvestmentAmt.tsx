import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, InfoIcon, HelpCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import GlassCard from '@/components/ui-elements/GlassCard';
import NavBar from '@/components/NavBar';

// Sample mutual fund data (same as from the previous component)
const mutualFundsData = [
  {
    id: '1',
    name: 'Axis Bluechip Fund',
    category: 'Equity',
    returns: 12.5,
    risk: 'Moderate',
    trending: 'up',
    minInvestment: 500,
    aum: '₹2,500 Cr',
    nav: '₹49.21',
    expenseRatio: '1.2%',
    fundManager: 'Shreyas Kumar',
    launchDate: 'Jan 15, 2010',
  },
  // Other funds would be here
];

const InvestmentAmtPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [investmentType, setInvestmentType] = useState<'onetime' | 'sip'>('onetime');
  const [amount, setAmount] = useState<string>('5000');
  const [fund, setFund] = useState<any>(null);
  const [expectedReturns, setExpectedReturns] = useState<number | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fundData = mutualFundsData.find(f => f.id === id);
    setFund(fundData);
  }, [id]);

  useEffect(() => {
    // Simple calculation for expected returns
    if (fund && amount) {
      const principal = parseFloat(amount);
      const annualReturn = fund.returns / 100; // Convert percentage to decimal
      let result = 0;
      
      if (investmentType === 'onetime') {
        // One-time investment after 1 year
        result = principal * (1 + annualReturn);
      } else {
        // SIP investment (simplified calculation for 12 months)
        // Using future value of annuity formula
        const monthlyReturn = annualReturn / 12;
        result = principal * ((Math.pow(1 + monthlyReturn, 12) - 1) / monthlyReturn) * (1 + monthlyReturn);
      }
      
      setExpectedReturns(Math.round(result - (investmentType === 'sip' ? principal * 12 : principal)));
    }
  }, [amount, fund, investmentType]);

  const handleProceed = () => {
    if (parseFloat(amount) < (fund?.minInvestment || 0)) {
      // Show error - amount less than minimum
      return;
    }
    
    navigate(`/payment/${id}`, { 
      state: { 
        amount: parseFloat(amount),
        investmentType,
        fundName: fund?.name,
        fundCategory: fund?.category
      } 
    });
  };

  if (!fund) {
    return (
      <div className="container max-w-3xl mx-auto p-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const presetAmounts = investmentType === 'onetime' 
    ? [1000, 5000, 10000, 25000] 
    : [500, 1000, 2500, 5000];

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate(`/fund-details/${id}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Set Investment Amount</h1>
      </div>

      {/* Fund Summary */}
      <GlassCard className="mb-4">
        <h2 className="text-lg font-semibold mb-1">{fund.name}</h2>
        <p className="text-sm text-gray-500">{fund.category}</p>
      </GlassCard>

      {/* Investment Type Selection */}
      <div className="mb-4">
        <RadioGroup 
          value={investmentType} 
          onValueChange={(value) => setInvestmentType(value as 'onetime' | 'sip')}
          className="flex gap-4"
        >
          <div className={`flex-1 p-4 border rounded-lg cursor-pointer ${investmentType === 'onetime' ? 'border-payx-teal bg-teal-50' : 'border-gray-200'}`}>
            <RadioGroupItem value="onetime" id="onetime" className="hidden" />
            <Label htmlFor="onetime" className="flex flex-col items-center cursor-pointer">
              <span className="font-medium mb-1">One-time</span>
              <span className="text-xs text-gray-500">Lump sum investment</span>
            </Label>
          </div>
          <div className={`flex-1 p-4 border rounded-lg cursor-pointer ${investmentType === 'sip' ? 'border-payx-teal bg-teal-50' : 'border-gray-200'}`}>
            <RadioGroupItem value="sip" id="sip" className="hidden" />
            <Label htmlFor="sip" className="flex flex-col items-center cursor-pointer">
              <span className="font-medium mb-1">SIP</span>
              <span className="text-xs text-gray-500">Monthly investment</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Amount Input */}
      <GlassCard className="mb-4">
        <div className="mb-4">
          <Label htmlFor="amount" className="text-sm text-gray-600 mb-1 flex items-center">
            Enter {investmentType === 'onetime' ? 'Investment' : 'Monthly'} Amount
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-6 w-6 p-0 ml-1">
                  <HelpCircleIcon className="h-4 w-4 text-gray-400" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Investment Information</DialogTitle>
                </DialogHeader>
                <div className="text-sm">
                  <p className="mb-2">Minimum investment amount: ₹{fund.minInvestment}</p>
                  <p className="mb-2">
                    {investmentType === 'onetime' 
                      ? 'A one-time investment allows you to invest a lump sum amount once.'
                      : 'A SIP (Systematic Investment Plan) allows you to invest a fixed amount monthly.'}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7"
              min={fund.minInvestment}
            />
          </div>
          {parseFloat(amount) < fund.minInvestment && (
            <p className="text-red-500 text-xs mt-1">
              Minimum investment is ₹{fund.minInvestment}
            </p>
          )}
        </div>

        {/* Preset Amounts */}
        <div className="flex flex-wrap gap-2 mb-4">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              className={`px-3 py-1 text-sm rounded-full ${
                amount === preset.toString() 
                  ? 'bg-teal text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setAmount(preset.toString())}
            >
              ₹{preset.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Expected Returns */}
        {expectedReturns !== null && (
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Expected Returns (1Y)</h3>
                <p className="text-xs text-gray-500">
                  Based on historical performance of {fund.returns}%
                </p>
              </div>
              <div className="text-green-600 font-semibold">
                +₹{Math.abs(expectedReturns).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        <Button 
          className="w-full  hover:bg-teal-600 text-white"
          onClick={handleProceed}
          disabled={parseFloat(amount) < fund.minInvestment}
        >
          Proceed to Payment
        </Button>
      </GlassCard>
      <NavBar/>

    </div>
  );
};

export default InvestmentAmtPage;
