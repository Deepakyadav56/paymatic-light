
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Landmark, CreditCard, Trash2 } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useToast } from '@/hooks/use-toast';

const LinkedAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      type: 'bank',
      name: 'HDFC Bank',
      accountNumber: '****1234',
      icon: <Landmark size={20} className="text-blue-500" />,
    },
    {
      id: 2,
      type: 'card',
      name: 'ICICI Credit Card',
      accountNumber: '****5678',
      icon: <CreditCard size={20} className="text-red-500" />,
    },
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToAddAccount = () => {
    navigate('/add-account');
  };
  
  const handleRemove = (id: number) => {
    toast({
      title: "Remove Account",
      description: "Are you sure you want to remove this account?",
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setAccounts(accounts.filter(account => account.id !== id));
            toast({
              title: "Account Removed",
              description: "The account has been removed successfully"
            });
          }}
        >
          Remove
        </Button>
      )
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Linked Accounts</h1>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-8">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <Card
                key={account.id}
                variant="outline"
                className="p-4"
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {account.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-900 font-medium">{account.name}</p>
                    <p className="text-dark-400 text-xs">Account: {account.accountNumber}</p>
                  </div>
                  <button
                    className="text-red-500 p-2"
                    onClick={() => handleRemove(account.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-dark-400 mb-4">No accounts linked yet</p>
            </div>
          )}
        </div>
        
        <Button
          fullWidth
          icon={<Plus size={18} />}
          onClick={goToAddAccount}
        >
          Add New Account
        </Button>
      </div>
    </div>
  );
};

export default LinkedAccounts;
