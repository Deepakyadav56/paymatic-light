
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, TrendingUp, BarChart4, Plus, Filter } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';

const FundsOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const navigate = useNavigate();
  
  const fundCategories = ['all', 'equity', 'debt', 'hybrid', 'index'];
  
  const funds = [
    {
      id: 1,
      name: 'Blue Chip Growth Fund',
      category: 'equity',
      return: 15.2,
      minInvestment: 500,
      risk: 'High',
      ytd: 12.5,
      oneYear: 18.3,
      threeYear: 14.2,
    },
    {
      id: 2,
      name: 'Income Bond Fund',
      category: 'debt',
      return: 8.7,
      minInvestment: 1000,
      risk: 'Low',
      ytd: 6.2,
      oneYear: 7.9,
      threeYear: 8.1,
    },
    {
      id: 3,
      name: 'Balanced Advantage Fund',
      category: 'hybrid',
      return: 10.9,
      minInvestment: 500,
      risk: 'Medium',
      ytd: 9.5,
      oneYear: 11.2,
      threeYear: 10.3,
    },
    {
      id: 4,
      name: 'Nifty 50 Index Fund',
      category: 'index',
      return: 14.5,
      minInvestment: 100,
      risk: 'Medium',
      ytd: 13.8,
      oneYear: 16.2,
      threeYear: 13.9,
    },
  ];
  
  const filteredFunds = activeTab === 'all'
    ? funds
    : funds.filter(fund => fund.category === activeTab);
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToFundDetails = (fundId: number) => {
    navigate(`/fund/${fundId}`);
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Mutual Funds</h1>
      </div>
      
      <div className="bg-white px-6 py-5 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 mb-1">Your Portfolio</p>
              <h2 className="text-3xl font-display font-bold">₹500</h2>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp size={32} className="text-white" />
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
              +₹45 (9%)
            </div>
            <span className="text-blue-100 text-sm">Last month</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-dark-900">Explore Funds</h2>
          <button className="flex items-center text-sm text-teal-500 font-medium">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto pb-2 mb-4">
          <div className="flex space-x-2 whitespace-nowrap">
            {fundCategories.map((category) => (
              <button
                key={category}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeTab === category
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-dark-600'
                )}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredFunds.map((fund) => (
            <Card
              key={fund.id}
              variant="elevated"
              isHoverable
              className="p-4"
              onClick={() => goToFundDetails(fund.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-dark-900 font-medium">{fund.name}</h3>
                <ChevronRight size={18} className="text-dark-400" />
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <BarChart4 size={16} className="text-dark-400 mr-1" />
                  <span className="text-dark-600 text-sm">{fund.category.charAt(0).toUpperCase() + fund.category.slice(1)}</span>
                </div>
                <div className={`text-sm font-medium ${getRiskColor(fund.risk)}`}>
                  {fund.risk} Risk
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-dark-400 text-xs mb-1">1Y Returns</p>
                  <p className="text-green-500 font-medium">{fund.return}%</p>
                </div>
                <div>
                  <p className="text-dark-400 text-xs mb-1">Min. Investment</p>
                  <p className="text-dark-900 font-medium">₹{fund.minInvestment}</p>
                </div>
                <div>
                  <Button
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/fund/${fund.id}`);
                    }}
                  >
                    Invest
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <Button
          variant="outline"
          fullWidth
          className="mt-6"
          onClick={() => navigate('/funds-explore')}
        >
          Explore All Funds
        </Button>
      </div>
      
      <NavBar />
    </div>
  );
};

// Helper function to get color based on risk level
const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'High':
      return 'text-red-500';
    case 'Medium':
      return 'text-amber-500';
    case 'Low':
      return 'text-green-500';
    default:
      return 'text-dark-600';
  }
};

export default FundsOverview;
