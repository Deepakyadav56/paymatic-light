
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, Send, QrCode, CreditCard, BarChart4, Zap, Bell, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';
import Card from '@/components/Card';
import Button from '@/components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const quickActions = [
    {
      icon: <Send size={24} className="text-teal-500" />,
      label: 'Send',
      path: '/send',
      color: 'bg-teal-50',
    },
    {
      icon: <ArrowDownLeft size={24} className="text-blue-500" />,
      label: 'Request',
      path: '/request',
      color: 'bg-blue-50',
    },
    {
      icon: <QrCode size={24} className="text-green-500" />,
      label: 'QR',
      path: '/scan',
      color: 'bg-green-50',
    },
    {
      icon: <CreditCard size={24} className="text-red-500" />,
      label: 'Bills',
      path: '/bills',
      color: 'bg-red-50',
    },
    {
      icon: <Zap size={24} className="text-amber-500" />,
      label: 'Recharge',
      path: '/recharge',
      color: 'bg-amber-50',
    },
    {
      icon: <BarChart4 size={24} className="text-purple-500" />,
      label: 'Funds',
      path: '/funds',
      color: 'bg-purple-50',
    },
  ];
  
  const recentTransactions = [
    {
      id: 1,
      name: 'John Smith',
      amount: -50,
      date: '10:30 AM',
      avatar: 'JS',
    },
    {
      id: 2,
      name: 'Amazon',
      amount: -29.99,
      date: 'Yesterday',
      avatar: 'A',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      amount: 75,
      date: 'Yesterday',
      avatar: 'SJ',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 relative">
        <div className="absolute top-12 right-6">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <h1 className="text-xl font-medium text-dark-900">Hello, John 👋</h1>
        
        <div className="mt-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white">
          <p className="text-teal-100 mb-1">Available Balance</p>
          <h2 className="text-4xl font-display font-bold mb-6">₹1,200</h2>
          
          <Button
            variant="outline"
            icon={<PlusIcon size={16} />}
            className="border-white/30 text-white hover:bg-white/10 active:bg-white/20"
            onClick={() => navigate('/add-money')}
          >
            Add Money
          </Button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-medium text-dark-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.label}
              className="flex flex-col items-center"
              onClick={() => navigate(action.path)}
            >
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-sm transition-transform active:scale-95",
                action.color
              )}>
                {action.icon}
              </div>
              <span className="text-xs text-dark-800">{action.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="px-6 py-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-dark-900">Recent Transactions</h3>
          <button
            className="text-teal-500 text-sm font-medium"
            onClick={() => navigate('/transactions')}
          >
            See All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              variant="elevated"
              isHoverable
              className="flex items-center"
              onClick={() => navigate(`/transaction/${transaction.id}`)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-teal-500 mr-3">
                {transaction.avatar}
              </div>
              <div className="flex-1">
                <p className="text-dark-900 font-medium">{transaction.name}</p>
                <p className="text-dark-400 text-sm">{transaction.date}</p>
              </div>
              <p className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-dark-900'}`}>
                {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
              </p>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Mutual Funds Teaser */}
      <div className="px-6 py-4">
        <Card
          variant="elevated"
          isHoverable
          className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100"
          onClick={() => navigate('/funds')}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <BarChart4 size={40} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-dark-900 font-medium mb-1">Grow your wealth</h3>
              <p className="text-dark-600 text-sm">Invest in mutual funds and earn up to 12% returns</p>
            </div>
            <ArrowUpRight size={20} className="text-blue-500" />
          </div>
        </Card>
      </div>
      
      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default Home;
