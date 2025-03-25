
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CreditCard, Landmark, Wallet, ChevronRight, Plus } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { amount, investmentType, fund } = location.state || {
    amount: 1000,
    investmentType: 'lumpsum',
    fund: { name: 'Sample Fund', return: 10 }
  };
  
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'bank'>('wallet');
  
  const paymentMethods = [
    {
      id: 'wallet',
      name: 'PayX Wallet',
      icon: <Wallet size={20} className="text-teal-500" />,
      balance: 1200,
    },
    {
      id: 'bank1',
      name: 'HDFC Bank',
      icon: <Landmark size={20} className="text-blue-500" />,
      accountNumber: '****1234',
      type: 'bank',
    },
    {
      id: 'bank2',
      name: 'ICICI Bank',
      icon: <Landmark size={20} className="text-red-500" />,
      accountNumber: '****5678',
      type: 'bank',
    },
  ];
  
  const goBack = () => {
    navigate(-1);
  };
  
  const handleConfirm = () => {
    navigate('/investment-success', {
      state: {
        amount,
        investmentType,
        fund,
        paymentMethod: paymentMethods.find(pm => pm.id === paymentMethod),
      }
    });
  };
  
  const addNewAccount = () => {
    navigate('/add-account');
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Payment Method</h1>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-dark-900 mb-4">Investment Details</h2>
          
          <Card variant="outline" className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-dark-900">{fund.name}</h3>
              <span className="text-green-500 text-sm font-medium">+{fund.return}% (1Y)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-dark-600">{investmentType === 'lumpsum' ? 'One Time' : 'Monthly SIP'}</span>
              <span className="text-dark-900 font-medium">₹{amount}</span>
            </div>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium text-dark-900 mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                variant={paymentMethod === method.id ? 'elevated' : 'outline'}
                className={cn(
                  'border transition-all',
                  paymentMethod === method.id ? 'border-teal-500' : 'border-gray-200'
                )}
                onClick={() => setPaymentMethod(method.id as any)}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-900 font-medium">{method.name}</p>
                    <p className="text-dark-400 text-xs">
                      {method.id === 'wallet' 
                        ? `Balance: ₹${method.balance}` 
                        : `Account: ${method.accountNumber}`}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                    {paymentMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            
            <button
              className="flex items-center w-full text-teal-500 font-medium py-3"
              onClick={addNewAccount}
            >
              <Plus size={18} className="mr-2" />
              Add New Account
            </button>
          </div>
        </div>
        
        <Button
          fullWidth
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
