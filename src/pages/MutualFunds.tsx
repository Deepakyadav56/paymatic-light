
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GlassCard from '@/components/ui-elements/GlassCard';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';

// Sample mutual fund data
const mutualFundsData = [
  {
    id: '1',
    name: 'Axis Bluechip Fund',
    category: 'Equity',
    returns: 12.5,
    risk: 'Moderate',
    trending: 'up',
    minInvestment: 500,
    aum: '₹2,500 Cr',
  },
  {
    id: '2',
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Equity',
    returns: 15.8,
    risk: 'High',
    trending: 'up',
    minInvestment: 1000,
    aum: '₹3,100 Cr',
  },
  {
    id: '3',
    name: 'SBI Balanced Advantage Fund',
    category: 'Hybrid',
    returns: 8.7,
    risk: 'Low',
    trending: 'down',
    minInvestment: 500,
    aum: '₹1,800 Cr',
  },
  {
    id: '4',
    name: 'ICICI Prudential Value Discovery',
    category: 'Equity',
    returns: 14.2,
    risk: 'High',
    trending: 'up',
    minInvestment: 1000,
    aum: '₹4,500 Cr',
  },
  {
    id: '5',
    name: 'Kotak Corporate Bond Fund',
    category: 'Debt',
    returns: 6.5,
    risk: 'Low',
    trending: 'up',
    minInvestment: 5000,
    aum: '₹5,200 Cr',
  },
  {
    id: '6',
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: 13.9,
    risk: 'Moderate',
    trending: 'up',
    minInvestment: 500,
    aum: '₹2,800 Cr',
  },
];

const filterOptions = ['All', 'Equity', 'Debt', 'Hybrid', 'ELSS'];

const MutualFundsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const navigate = useNavigate();

  const filteredFunds = mutualFundsData.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || fund.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleFundClick = (id: string) => {
    navigate(`/fund-details/${id}`);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600';
      case 'Moderate':
        return 'text-orange-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Explore Mutual Funds</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search funds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-payx-teal focus:ring-1 focus:ring-payx-teal"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={selectedFilter === filter 
                ? "bg-payx-teal text-white" 
                : "border-gray-200 text-gray-600 hover:bg-gray-50"}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </header>

      {/* Fund List */}
      <div className="space-y-4">
        {filteredFunds.map((fund) => (
          <GlassCard 
            key={fund.id} 
            className="hover:shadow-md transition-all duration-300"
            hoverEffect={true}
            onClick={() => handleFundClick(fund.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{fund.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{fund.category} • Min ₹{fund.minInvestment}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className={`${getRiskColor(fund.risk)} text-sm font-medium`}>
                    {fund.risk} Risk
                  </div>
                  <div className="text-gray-500 text-sm">
                    AUM: {fund.aum}
                  </div>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center mb-1">
                  <span className={`font-semibold text-lg ${fund.trending === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {fund.returns}%
                  </span>
                  {fund.trending === 'up' ? (
                    <TrendingUpIcon className="h-4 w-4 text-green-600 ml-1" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 text-red-500 ml-1" />
                  )}
                </div>
                <span className="text-xs text-gray-500">1Y Returns</span>
              </div>
            </div>
          </GlassCard>
        ))}
        
        {filteredFunds.length === 0 && (
          <Card className="p-6 text-center text-gray-500">
            <p>No mutual funds found matching your criteria</p>
          </Card>
        )}
      </div>
      <NavBar />

    </div>
  );
};

export default MutualFundsPage;
