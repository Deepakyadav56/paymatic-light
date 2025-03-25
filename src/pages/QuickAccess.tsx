
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Wallet, ArrowDownLeft, ArrowUpRight, BarChart4, Pin, PinOff } from 'lucide-react';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

const QuickAccess: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);
  
  const navigate = useNavigate();
  
  const closeWidget = () => {
    navigate(-1);
  };
  
  const togglePin = () => {
    setIsPinned(!isPinned);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="relative w-full max-w-sm">
        <div className="absolute top-0 right-0 flex space-x-2">
          <button
            className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
            onClick={togglePin}
          >
            {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
          </button>
          <button
            className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
            onClick={closeWidget}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4 mt-12">
          <Card
            variant="elevated"
            className="glass-effect bg-white/90"
            isHoverable
            onClick={() => navigate('/home')}
          >
            <div className="flex items-center">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Wallet size={24} className="text-teal-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Balance</h3>
                <p className="text-2xl font-display font-bold text-dark-900">₹1,200</p>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
          
          <Card
            variant="elevated"
            className="glass-effect bg-white/90"
            isHoverable
            onClick={() => navigate('/transactions')}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <ArrowUpRight size={24} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Last Transaction</h3>
                <p className="text-dark-600">₹50 sent to John Smith</p>
                <p className="text-dark-400 text-xs">Today, 10:30 AM</p>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
          
          <Card
            variant="elevated"
            className="glass-effect bg-white/90"
            isHoverable
            onClick={() => navigate('/funds')}
          >
            <div className="flex items-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <BarChart4 size={24} className="text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Investment Gains</h3>
                <div className="flex items-center">
                  <p className="text-green-500 font-medium">+₹45 (9%)</p>
                  <p className="text-dark-400 text-xs ml-2">Last month</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
