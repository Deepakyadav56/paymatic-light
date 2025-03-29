
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart4, 
  Calculator, 
  HelpCircle,
  AlertCircle,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/ui-elements/GlassCard';
import NavBar from '@/components/NavBar';

// Sample tax-saver funds
const taxSaverFunds = [
  {
    id: '6',
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: 13.9,
    risk: 'Moderate',
    minInvestment: 500,
    lockInPeriod: '3 years'
  },
  {
    id: '7',
    name: 'Axis Long Term Equity Fund',
    category: 'ELSS',
    returns: 15.2,
    risk: 'High',
    minInvestment: 500,
    lockInPeriod: '3 years'
  },
  {
    id: '8',
    name: 'DSP Tax Saver Fund',
    category: 'ELSS',
    returns: 12.7,
    risk: 'Moderate',
    minInvestment: 500,
    lockInPeriod: '3 years'
  }
];

const TaxPlanning = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState(1000000);
  const [alreadyInvested, setAlreadyInvested] = useState(50000);
  const maxDeduction = 150000;
  const remaining = Math.max(0, maxDeduction - alreadyInvested);
  const progressPercent = (alreadyInvested / maxDeduction) * 100;
  
  const taxableIncome = income - Math.min(alreadyInvested, maxDeduction);
  const taxSavings = calculateTaxSavings(income, alreadyInvested);

  function calculateTaxSavings(income: number, invested: number) {
    // Simple tax calculation (approximation for demonstration)
    const taxRate = 0.3; // Assuming 30% tax bracket
    return Math.min(invested, maxDeduction) * taxRate;
  }

  return (
    <div className="container max-w-3xl mx-auto p-4 pb-20 animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate('/portfolio')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Tax Planning</h1>
      </div>

      {/* Tax Summary */}
      <GlassCard className="mb-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Section 80C Deductions</h2>
            <Button 
              variant="ghost" 
              className="h-8 p-1 text-white hover:bg-teal-400/20"
              onClick={() => {}}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Invested</span>
              <span>₹{alreadyInvested.toLocaleString()} / ₹{maxDeduction.toLocaleString()}</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-teal-200/30" />
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-teal-100 text-xs mb-1">REMAINING LIMIT</p>
              <p className="font-medium text-lg">₹{remaining.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-teal-100 text-xs mb-1">TAX SAVINGS</p>
              <p className="font-medium text-lg">₹{taxSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tax Calculator */}
      <GlassCard className="mb-6">
        <div className="p-5">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center">
            Tax Calculator
            <Calculator className="h-4 w-4 ml-2 text-gray-400" />
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="income" className="text-sm text-gray-600">Annual Income</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="income"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="pl-7"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="invested" className="text-sm text-gray-600">Already Invested (80C)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="invested"
                  type="number"
                  value={alreadyInvested}
                  onChange={(e) => setAlreadyInvested(Number(e.target.value))}
                  className="pl-7"
                  max={maxDeduction}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Taxable Income</span>
                <span className="font-medium">₹{taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Potential Tax Savings</span>
                <span className="font-medium text-green-600">₹{taxSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tax-Saving Funds */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Tax-Saving ELSS Funds</h3>
          <Button 
            variant="link" 
            size="sm"
            className="h-8 text-xs text-teal-600"
            onClick={() => navigate('/tax-saver-funds')}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {taxSaverFunds.map((fund) => (
            <GlassCard 
              key={fund.id} 
              className="p-4 hover:shadow-md cursor-pointer transition-all"
              onClick={() => navigate(`/fund-details/${fund.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{fund.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full mr-2">
                      {fund.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      Lock-in: {fund.lockInPeriod}
                    </span>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium text-sm">{fund.returns}%</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-3">
                <span className="text-xs text-gray-500">Min: ₹{fund.minInvestment}</span>
                <Button 
                  size="sm" 
                  className="h-7 text-xs px-3 bg-teal-500 hover:bg-teal-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/invest/${fund.id}`);
                  }}
                >
                  Invest
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start space-x-2 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg mb-4">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-400" />
        <p>
          ELSS funds have a lock-in period of 3 years. Tax benefits are subject to changes in tax laws. 
          Please consult your tax advisor for personalized advice.
        </p>
      </div>

      <NavBar />
    </div>
  );
};

export default TaxPlanning;
