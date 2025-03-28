
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/ui-elements/GlassCard';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: <Smartphone className="h-5 w-5 text-purple-500" /> },
  { id: 'netbanking', name: 'Net Banking', icon: <Building className="h-5 w-5 text-blue-500" /> },
  { id: 'card', name: 'Debit/Credit Card', icon: <CreditCard className="h-5 w-5 text-green-500" /> },
];

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get data from navigation state
  const { amount, investmentType, fundName, fundCategory } = location.state as { 
    amount: number, 
    investmentType: 'onetime' | 'sip',
    fundName: string,
    fundCategory: string
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment...",
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // Success - navigate to confirmation page
      navigate(`/confirmation/${id}`, { 
        state: { 
          amount, 
          investmentType,
          fundName,
          fundCategory,
          transactionId: 'TX' + Math.floor(Math.random() * 1000000000)
        } 
      });
    }, 2000);
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Payment</h1>
      </div>

      {/* Investment Summary */}
      <GlassCard className="mb-4">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fund</span>
            <span className="font-medium">{fundName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Category</span>
            <span>{fundCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Investment Type</span>
            <span className="capitalize">{investmentType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {investmentType === 'onetime' ? 'Amount' : 'Monthly Amount'}
            </span>
            <span className="font-medium">₹{amount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-payx-teal">₹{amount.toLocaleString()}</span>
          </div>
        </div>
      </GlassCard>

      {/* Payment Methods */}
      <GlassCard className="mb-4">
        <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
        
        <RadioGroup 
          value={selectedMethod} 
          onValueChange={setSelectedMethod}
          className="space-y-3"
        >
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                selectedMethod === method.id ? 'border-payx-teal bg-teal-50' : 'border-gray-200'
              }`}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mr-4" />
              <div className="mr-3">{method.icon}</div>
              <Label htmlFor={method.id} className="cursor-pointer flex-1">
                {method.name}
              </Label>
              {selectedMethod === method.id && (
                <CheckCircle2 className="h-5 w-5 text-payx-teal" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {/* Payment Method Specific UI would go here */}
        {selectedMethod === 'upi' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Enter your UPI ID</p>
            {/* UPI form fields would go here */}
          </div>
        )}
      </GlassCard>

      {/* Disclaimer */}
      <div className="mb-4 text-xs text-gray-500 flex items-start">
        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          By proceeding, you agree to our terms and conditions for mutual fund investments. 
          Investments in mutual funds are subject to market risks. Please read all scheme 
          related documents carefully before investing.
        </p>
      </div>

      {/* Payment Button */}
      <Button 
        className="w-full  hover:bg-teal-600 text-white h-12 text-base"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
      </Button>
      <NavBar/>

    </div>
  );
};

export default PaymentPage;
