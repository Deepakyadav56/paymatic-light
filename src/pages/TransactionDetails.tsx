
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Share2, Copy, Check, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

// Sample transaction data
const transactions = [
  {
    id: 1,
    type: 'payment',
    subtype: 'sent',
    name: 'John Smith',
    amount: -50,
    date: 'Today, 10:30 AM',
    status: 'completed',
    avatar: 'JS',
    description: 'Dinner',
    method: 'UPI',
    upiId: 'john@upi',
    transactionId: 'TX123456789',
  },
  {
    id: 2,
    type: 'payment',
    subtype: 'purchase',
    name: 'Amazon',
    amount: -29.99,
    date: 'Yesterday, 02:15 PM',
    status: 'completed',
    avatar: 'A',
    description: 'Headphones',
    method: 'Card',
    cardNumber: '****1234',
    transactionId: 'TX987654321',
  },
  {
    id: 3,
    type: 'payment',
    subtype: 'received',
    name: 'Sarah Johnson',
    amount: 75,
    date: 'Yesterday, 09:45 AM',
    status: 'completed',
    avatar: 'SJ',
    description: 'Rent',
    method: 'UPI',
    upiId: 'sarah@upi',
    transactionId: 'TX567891234',
  },
  {
    id: 4,
    type: 'fund',
    subtype: 'investment',
    name: 'Blue Chip Growth Fund',
    amount: -1000,
    date: 'Jul 15, 2023',
    status: 'completed',
    avatar: 'BC',
    units: '24.56',
    nav: '40.72',
    method: 'Wallet',
    transactionId: 'INV123456789',
  },
];

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  
  const navigate = useNavigate();
  
  const transactionId = parseInt(id || '1');
  const transaction = transactions.find(t => t.id === transactionId) || transactions[0];
  
  const goBack = () => {
    navigate(-1);
  };
  
  const copyTransactionId = () => {
    navigator.clipboard.writeText(transaction.transactionId);
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareTransaction = () => {
    // Placeholder for share functionality
    console.log('Share transaction');
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Transaction Details</h1>
      </div>
      
      <div className="p-6">
        <Card variant="elevated" className="mb-6">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-teal-500 mb-3">
              {transaction.avatar}
            </div>
            
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-1">
              {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
            </h2>
            
            <div className="flex items-center">
              <div className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                transaction.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {transaction.status === 'completed' ? 'Completed' : 'Pending'}
              </div>
            </div>
            
            <p className="text-dark-600 text-sm">
              {transaction.amount > 0 ? 'Received from' : 'Sent to'} {transaction.name}
            </p>
          </div>
          
          {transaction.description && (
            <div className="border-t border-b border-gray-100 py-3 mb-3 text-center">
              <p className="text-dark-400 text-xs mb-1">Description</p>
              <p className="text-dark-900">{transaction.description}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-dark-600 text-sm">Date & Time</span>
              <span className="text-dark-900 text-sm font-medium">{transaction.date}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-dark-600 text-sm">Payment Method</span>
              <span className="text-dark-900 text-sm font-medium">{transaction.method}</span>
            </div>
            
            {transaction.upiId && (
              <div className="flex justify-between">
                <span className="text-dark-600 text-sm">UPI ID</span>
                <span className="text-dark-900 text-sm font-medium">{transaction.upiId}</span>
              </div>
            )}
            
            {transaction.cardNumber && (
              <div className="flex justify-between">
                <span className="text-dark-600 text-sm">Card</span>
                <span className="text-dark-900 text-sm font-medium">{transaction.cardNumber}</span>
              </div>
            )}
            
            {transaction.units && (
              <div className="flex justify-between">
                <span className="text-dark-600 text-sm">Units</span>
                <span className="text-dark-900 text-sm font-medium">{transaction.units}</span>
              </div>
            )}
            
            {transaction.nav && (
              <div className="flex justify-between">
                <span className="text-dark-600 text-sm">NAV</span>
                <span className="text-dark-900 text-sm font-medium">₹{transaction.nav}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-dark-600 text-sm">Transaction ID</span>
              <div className="flex items-center">
                <span className="text-dark-900 text-sm font-medium mr-2">{transaction.transactionId.slice(0, 6)}...{transaction.transactionId.slice(-4)}</span>
                <button onClick={copyTransactionId}>
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-dark-400" />}
                </button>
              </div>
            </div>
          </div>
        </Card>
        
        <Button
          variant="outline"
          fullWidth
          icon={<Share2 size={18} />}
          onClick={shareTransaction}
        >
          Share Receipt
        </Button>
      </div>
    </div>
  );
};

export default TransactionDetails;
