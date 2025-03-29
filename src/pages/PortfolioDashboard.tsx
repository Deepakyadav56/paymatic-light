
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart4, 
  PieChart, 
  ArrowUpRight, 
  Filter,
  Calendar,
  InfoIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui-elements/GlassCard';
import NavBar from '@/components/NavBar';

// Sample portfolio data
const portfolioData = {
  totalValue: 25000,
  invested: 20000,
  returns: 5000,
  returnsPercentage: 25,
  sip: 2500,
  funds: [
    {
      id: '1',
      name: 'Axis Bluechip Fund',
      category: 'Equity',
      invested: 5000,
      current: 6200,
      returns: 1200,
      returnsPercentage: 24,
      units: 102.45,
      nav: 60.52,
      lastUpdated: '21 Jun, 2023'
    },
    {
      id: '3',
      name: 'SBI Balanced Advantage Fund',
      category: 'Hybrid',
      invested: 8000,
      current: 9400,
      returns: 1400,
      returnsPercentage: 17.5,
      units: 327.65,
      nav: 28.69,
      lastUpdated: '21 Jun, 2023'
    },
    {
      id: '5',
      name: 'Kotak Corporate Bond Fund',
      category: 'Debt',
      invested: 7000,
      current: 7800,
      returns: 800,
      returnsPercentage: 11.4,
      units: 240.22,
      nav: 32.47,
      lastUpdated: '21 Jun, 2023'
    }
  ],
  assetAllocation: [
    { name: 'Equity', value: 60 },
    { name: 'Debt', value: 30 },
    { name: 'Hybrid', value: 10 }
  ]
};

const timeframes = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' }
];

const PortfolioDashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('1m');
  
  const getReturnColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-500';
  };
  
  const getReturnIndicator = (value: number) => {
    return value >= 0 ? '+' : '';
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 pb-20 animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="p-2 mr-2" 
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Portfolio</h1>
        </div>
        <Button 
          variant="ghost" 
          className="p-2"
          onClick={() => navigate('/mutual-funds')}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Summary Card */}
      <GlassCard className="mb-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-teal-100 text-sm">CURRENT VALUE</p>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last updated: Today</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">₹{portfolioData.totalValue.toLocaleString()}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-teal-100 text-xs mb-1">INVESTED</p>
              <p className="font-medium">₹{portfolioData.invested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-teal-100 text-xs mb-1">RETURNS</p>
              <div className="flex items-center">
                <p className="font-medium">₹{portfolioData.returns.toLocaleString()}</p>
                <span className="ml-2 px-2 py-0.5 bg-green-400 text-green-900 text-xs rounded-full font-medium">
                  +{portfolioData.returnsPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Time period selector */}
        <div className="bg-teal-600 rounded-b-xl p-3">
          <div className="flex overflow-x-auto no-scrollbar">
            {timeframes.map((period) => (
              <button
                key={period.value}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap mr-2 ${
                  timeframe === period.value 
                    ? 'bg-white text-teal-600 font-medium' 
                    : 'text-white'
                }`}
                onClick={() => setTimeframe(period.value)}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Portfolio Content */}
      <Tabs defaultValue="investments" className="mb-6">
        <TabsList className="w-full bg-gray-100 p-1">
          <TabsTrigger value="investments" className="flex-1">Investments</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="investments" className="mt-4 space-y-4">
          {portfolioData.funds.map((fund) => (
            <GlassCard 
              key={fund.id} 
              className="p-4 hover:shadow-md cursor-pointer transition-all"
              onClick={() => navigate(`/fund-details/${fund.id}`)}
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-gray-800">{fund.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {fund.category}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Current Value</p>
                  <p className="font-medium">₹{fund.current.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Returns</p>
                  <div className="flex items-center">
                    <p className={`font-medium ${getReturnColor(fund.returnsPercentage)}`}>
                      {getReturnIndicator(fund.returnsPercentage)}₹{fund.returns.toLocaleString()}
                    </p>
                    <span className={`ml-2 text-xs ${getReturnColor(fund.returnsPercentage)}`}>
                      ({getReturnIndicator(fund.returnsPercentage)}{fund.returnsPercentage}%)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{fund.units} units</span>
                <span>NAV: ₹{fund.nav}</span>
              </div>
            </GlassCard>
          ))}
          
          <Button 
            onClick={() => navigate('/mutual-funds')}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl py-2.5"
          >
            Invest More
          </Button>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4">
          <GlassCard className="p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Asset Allocation</h3>
            <div className="flex items-center">
              <div className="w-28 h-28 mr-6">
                <PieChart className="w-full h-full text-teal-500 opacity-80" />
              </div>
              <div className="flex-1">
                {portfolioData.assetAllocation.map((asset) => (
                  <div key={asset.name} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{asset.name}</span>
                      <span className="text-sm font-medium">{asset.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          asset.name === 'Equity' ? 'bg-teal-500' :
                          asset.name === 'Debt' ? 'bg-blue-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${asset.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Performance</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                See Details
              </Button>
            </div>
            
            <div className="h-40 w-full flex items-center justify-center bg-gray-100 rounded-lg mb-3">
              <BarChart4 className="h-20 w-20 text-gray-300" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2">
                <p className="text-xs text-gray-500">1M</p>
                <p className="text-green-600 font-medium">+3.2%</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">3M</p>
                <p className="text-green-600 font-medium">+8.7%</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">6M</p>
                <p className="text-green-600 font-medium">+12.1%</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">1Y</p>
                <p className="text-green-600 font-medium">+25.0%</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">3Y</p>
                <p className="text-green-600 font-medium">+47.5%</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500">5Y</p>
                <p className="text-green-600 font-medium">+82.3%</p>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* SIP Summary */}
      <GlassCard className="mb-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800">Active SIPs</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => navigate('/sip-dashboard')}
            >
              Manage SIPs
            </Button>
          </div>
          
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium">Monthly SIP Amount</p>
                <p className="font-semibold text-teal-600">₹{portfolioData.sip.toLocaleString()}</p>
              </div>
              <p className="text-xs text-gray-500">Next debit: 5th July, 2023</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline"
          className="p-4 h-auto flex flex-col items-center justify-center border-gray-200"
          onClick={() => navigate('/sip-setup/new')}
        >
          <Calendar className="h-6 w-6 mb-2 text-teal-500" />
          <span>Start SIP</span>
        </Button>
        <Button 
          variant="outline"
          className="p-4 h-auto flex flex-col items-center justify-center border-gray-200"
          onClick={() => navigate('/transactions')}
        >
          <BarChart4 className="h-6 w-6 mb-2 text-teal-500" />
          <span>Transactions</span>
        </Button>
      </div>

      <NavBar />
    </div>
  );
};

export default PortfolioDashboard;
