
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Landmark, CreditCard } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AddAccount: React.FC = () => {
  const [accountType, setAccountType] = useState<'bank' | 'card'>('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const handleSubmit = () => {
    if (accountType === 'bank') {
      if (!bankName || !accountNumber || !ifsc) {
        toast({
          title: "Missing fields",
          description: "Please fill all the required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (accountNumber.length < 8) {
        toast({
          title: "Invalid account number",
          description: "Please enter a valid account number",
          variant: "destructive"
        });
        return;
      }
      
      if (ifsc.length < 11) {
        toast({
          title: "Invalid IFSC code",
          description: "Please enter a valid IFSC code",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!cardNumber || !expiryDate || !cvv) {
        toast({
          title: "Missing fields",
          description: "Please fill all the required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return;
      }
      
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter date in MM/YY format",
          variant: "destructive"
        });
        return;
      }
      
      if (cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Account Added",
        description: `Your ${accountType === 'bank' ? 'bank account' : 'card'} has been added successfully`
      });
      
      navigate('/linked-accounts');
    }, 1500);
  };
  
  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(value)) {
      // Add space after every 4 digits
      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      setCardNumber(formatted);
    }
  };
  
  // Format expiry date with slash
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length > 2) {
        setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
      } else {
        setExpiryDate(value);
      }
    }
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Add New Account</h1>
      </div>
      
      <div className="p-6">
        <div className="flex mb-6">
          <button
            className={cn(
              'flex-1 py-4 flex flex-col items-center justify-center rounded-l-xl border transition-colors',
              accountType === 'bank' 
                ? 'bg-teal-500 text-white border-teal-500' 
                : 'bg-white text-dark-600 border-gray-200'
            )}
            onClick={() => setAccountType('bank')}
          >
            <Landmark size={24} className={accountType === 'bank' ? 'text-white' : 'text-dark-400'} />
            <span className="mt-2 font-medium">Bank Account</span>
          </button>
          <button
            className={cn(
              'flex-1 py-4 flex flex-col items-center justify-center rounded-r-xl border transition-colors',
              accountType === 'card' 
                ? 'bg-teal-500 text-white border-teal-500' 
                : 'bg-white text-dark-600 border-gray-200'
            )}
            onClick={() => setAccountType('card')}
          >
            <CreditCard size={24} className={accountType === 'card' ? 'text-white' : 'text-dark-400'} />
            <span className="mt-2 font-medium">Debit/Credit Card</span>
          </button>
        </div>
        
        <Card variant="outline" className="mb-8">
          {accountType === 'bank' ? (
            <div className="space-y-4">
              <Input
                label="Bank Name"
                placeholder="Enter bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              
              <Input
                label="Account Number"
                placeholder="Enter account number"
                type="number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              
              <Input
                label="IFSC Code"
                placeholder="Enter IFSC code"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Card Number"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19} // 16 digits + 3 spaces
              />
              
              <div className="flex space-x-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5} // MM/YY
                  fullWidth={false}
                  className="flex-1"
                />
                
                <Input
                  label="CVV"
                  placeholder="XXX"
                  type="password"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 3) {
                      setCvv(value);
                    }
                  }}
                  maxLength={3}
                  fullWidth={false}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </Card>
        
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={goBack}
          >
            Cancel
          </Button>
          
          <Button
            className="flex-1"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            {accountType === 'bank' ? 'Link Account' : 'Add Card'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
