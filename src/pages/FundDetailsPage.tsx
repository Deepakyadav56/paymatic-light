
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  InfoIcon, 
  BarChart3Icon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  UserIcon,
  CalendarIcon,
  CreditCardIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import GlassCard from '@/components/ui-elements/GlassCard';
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
    nav: '₹49.21',
    expenseRatio: '1.2%',
    fundManager: 'Shreyas Kumar',
    launchDate: 'Jan 15, 2010',
    description: 'Axis Bluechip Fund is a large-cap fund that invests in established, financially sound companies with strong fundamentals and high market capitalization.',
    performanceHistory: [
      { year: '1M', returns: 2.1 },
      { year: '3M', returns: 5.8 },
      { year: '6M', returns: 8.5 },
      { year: '1Y', returns: 12.5 },
      { year: '3Y', returns: 14.2 },
      { year: '5Y', returns: 13.7 },
    ]
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
    nav: '₹87.33',
    expenseRatio: '1.8%',
    fundManager: 'Rajat Sharma',
    launchDate: 'Jun 25, 2007',
    description: 'HDFC Mid-Cap Opportunities Fund seeks to generate long-term capital appreciation by investing predominantly in mid-cap companies with high growth potential.',
    performanceHistory: [
      { year: '1M', returns: 3.2 },
      { year: '3M', returns: 7.9 },
      { year: '6M', returns: 11.4 },
      { year: '1Y', returns: 15.8 },
      { year: '3Y', returns: 18.3 },
      { year: '5Y', returns: 16.9 },
    ]
  },
  // Additional fund data would be here
  {
    id: '3',
    name: 'SBI Balanced Advantage Fund',
    category: 'Hybrid',
    returns: 8.7,
    risk: 'Low',
    trending: 'down',
    minInvestment: 500,
    aum: '₹1,800 Cr',
    nav: '₹28.75',
    expenseRatio: '1.15%',
    fundManager: 'Neha Patel',
    launchDate: 'Aug 5, 2015',
    description: 'SBI Balanced Advantage Fund is a dynamic asset allocation fund that adjusts equity and debt exposure based on market valuations to provide stable returns with lower volatility.',
    performanceHistory: [
      { year: '1M', returns: 1.2 },
      { year: '3M', returns: 3.5 },
      { year: '6M', returns: 4.9 },
      { year: '1Y', returns: 8.7 },
      { year: '3Y', returns: 9.8 },
      { year: '5Y', returns: 9.3 },
    ]
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
    nav: '₹62.88',
    expenseRatio: '1.6%',
    fundManager: 'Vikram Mehta',
    launchDate: 'Mar 12, 2009',
    description: 'ICICI Prudential Value Discovery Fund focuses on identifying undervalued companies with strong growth potential through detailed fundamental analysis and research.',
    performanceHistory: [
      { year: '1M', returns: 2.8 },
      { year: '3M', returns: 6.5 },
      { year: '6M', returns: 9.7 },
      { year: '1Y', returns: 14.2 },
      { year: '3Y', returns: 16.5 },
      { year: '5Y', returns: 15.1 },
    ]
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
    nav: '₹32.47',
    expenseRatio: '0.75%',
    fundManager: 'Anil Goel',
    launchDate: 'Sep 30, 2014',
    description: 'Kotak Corporate Bond Fund invests in high-quality corporate bonds with strong credit profiles to generate consistent income with capital preservation.',
    performanceHistory: [
      { year: '1M', returns: 0.6 },
      { year: '3M', returns: 1.8 },
      { year: '6M', returns: 3.5 },
      { year: '1Y', returns: 6.5 },
      { year: '3Y', returns: 7.2 },
      { year: '5Y', returns: 7.5 },
    ]
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
    nav: '₹41.36',
    expenseRatio: '1.9%',
    fundManager: 'Priya Iyer',
    launchDate: 'Feb 18, 1996',
    description: 'Aditya Birla Sun Life Tax Relief 96 is an ELSS fund that offers tax benefits under Section 80C while aiming for long-term capital appreciation through equity investments.',
    performanceHistory: [
      { year: '1M', returns: 2.4 },
      { year: '3M', returns: 6.8 },
      { year: '6M', returns: 9.2 },
      { year: '1Y', returns: 13.9 },
      { year: '3Y', returns: 15.7 },
      { year: '5Y', returns: 14.8 },
    ]
  },
];

const FundDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [fund, setFund] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fundData = mutualFundsData.find(f => f.id === id);
    setFund(fundData);
  }, [id]);

  if (!fund) {
    return (
      <div className="container max-w-3xl mx-auto p-4 text-center">
        <p>Loading fund details...</p>
      </div>
    );
  }

  const handleBuyClick = () => {
    navigate(`/invest/${id}`);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-600';
      case 'Moderate':
        return 'bg-orange-100 text-orange-500';
      case 'High':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate('/mutual-funds')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Fund Details</h1>
      </div>

      {/* Fund Overview */}
      <GlassCard className="mb-4">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-800">{fund.name}</h2>
          <p className="text-sm text-gray-500">{fund.category}</p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(fund.risk)}`}>
            {fund.risk} Risk
          </span>
          <span className="text-sm text-gray-500">
            Min. investment: ₹{fund.minInvestment}
          </span>
        </div>

        {/* Performance Overview */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Performance</h3>
            <div className="flex items-center">
              <span className={`font-semibold ${fund.trending === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                {fund.returns}%
              </span>
              {fund.trending === 'up' ? (
                <TrendingUpIcon className="h-4 w-4 text-green-600 ml-1" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 text-red-500 ml-1" />
              )}
            </div>
          </div>
          <div className="flex justify-between">
            {fund.performanceHistory.map((period: any, index: number) => (
              <div key={index} className="text-center">
                <div className={`text-xs font-medium ${period.returns >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {period.returns}%
                </div>
                <div className="text-xs text-gray-500">{period.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fund Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">NAV</p>
            <p className="font-medium">{fund.nav}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">AUM</p>
            <p className="font-medium">{fund.aum}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expense Ratio</p>
            <p className="font-medium">{fund.expenseRatio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Launch Date</p>
            <p className="font-medium">{fund.launchDate}</p>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full  hover:bg-teal-600 text-white" 
          onClick={handleBuyClick}
        >
          Invest Now
        </Button>
      </GlassCard>

      {/* Fund Manager */}
      <GlassCard className="mb-4">
        <div className="flex items-center">
          <UserIcon className="h-9 w-9 text-payx-teal bg-teal-50 p-2 rounded-full" />
          <div className="ml-3">
            <h3 className="font-medium">Fund Manager</h3>
            <p className="text-sm text-gray-600">{fund.fundManager}</p>
          </div>
        </div>
      </GlassCard>

      {/* About Section */}
      <Collapsible 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen}
        className="mb-4"
      >
        <CollapsibleTrigger asChild>
          <GlassCard className="cursor-pointer">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">About this Fund</h3>
              {isDetailsOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </GlassCard>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-2 p-4">
            <p className="text-sm text-gray-600">{fund.description}</p>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      <NavBar/>
    </div>
  );
};

export default FundDetailsPage;
