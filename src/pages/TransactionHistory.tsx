
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, ArrowDownLeft, ArrowUpRight, Download, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';

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
  },
  {
    id: 5,
    type: 'payment',
    subtype: 'sent',
    name: 'Michael Brown',
    amount: -25,
    date: 'Jul 12, 2023',
    status: 'completed',
    avatar: 'MB',
  },
  {
    id: 6,
    type: 'fund',
    subtype: 'dividend',
    name: 'Income Bond Fund',
    amount: 12.50,
    date: 'Jul 10, 2023',
    status: 'completed',
    avatar: 'IB',
  },
  {
    id: 7,
    type: 'payment',
    subtype: 'bill',
    name: 'Electricity Bill',
    amount: -75.40,
    date: 'Jul 05, 2023',
    status: 'completed',
    avatar: 'EB',
  },
];

const TransactionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'payments' | 'funds'>('all');
  
  const navigate = useNavigate();
  
  const filteredTransactions = activeTab === 'all'
    ? transactions
    : transactions.filter(t => t.type === activeTab.slice(0, -1)); // Remove 's' from the end
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToTransactionDetails = (id: number) => {
    navigate(`/transaction/${id}`);
  };
  
  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Export transactions');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 pt-12 pb-6 relative border-b border-gray-100">
        <button
          className="absolute top-12 left-6 p-2"
          onClick={goBack}
        >
          <ChevronLeft size={24} />
        </button>
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Transactions</h1>
      </div>
      
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {['all', 'payments', 'funds'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-white text-dark-600'
                )}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Filter size={16} />}
            >
              Filter
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                variant="elevated"
                className="p-4"
                isHoverable
                onClick={() => goToTransactionDetails(transaction.id)}
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-teal-500">
                      {transaction.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      {transaction.amount > 0 ? (
                        <ArrowDownLeft size={12} className="text-green-500" />
                      ) : (
                        <ArrowUpRight size={12} className="text-dark-900" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-dark-900 font-medium">{transaction.name}</p>
                    <p className="text-dark-400 text-xs">{transaction.date}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <p className={`font-medium mr-2 ${transaction.amount > 0 ? 'text-green-500' : 'text-dark-900'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                    </p>
                    <ChevronRight size={16} className="text-dark-400" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-dark-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default TransactionHistory;
