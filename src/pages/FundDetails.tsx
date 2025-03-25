
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, TrendingUp, Info, BarChart4, CalendarDays, AlertTriangle, ChevronDown } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

// Sample data for the fund details
const fundsData = [
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
    fiveYear: 13.5,
    details: 'This fund invests primarily in large-cap stocks with potential for long-term growth.',
    aum: '₹5,234 Cr',
    expense: '1.2%',
    nav: '₹45.23',
    manager: 'Rahul Sharma',
    rating: 5,
    inceptionDate: 'June 15, 2015',
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
    fiveYear: 7.5,
    details: 'A debt fund focusing on government and corporate bonds for stable returns.',
    aum: '₹2,845 Cr',
    expense: '0.8%',
    nav: '₹28.78',
    manager: 'Priya Patel',
    rating: 4,
    inceptionDate: 'March 12, 2012',
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
    fiveYear: 9.8,
    details: 'A balanced fund that dynamically allocates between equity and debt based on market conditions.',
    aum: '₹3,675 Cr',
    expense: '1.0%',
    nav: '₹32.45',
    manager: 'Amit Gupta',
    rating: 4,
    inceptionDate: 'September 8, 2016',
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
    fiveYear: 12.5,
    details: 'This fund tracks the Nifty 50 index, providing broad market exposure.',
    aum: '₹8,912 Cr',
    expense: '0.5%',
    nav: '₹124.67',
    manager: 'Vikram Singh',
    rating: 5,
    inceptionDate: 'January 25, 2010',
  },
];

const FundDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('returns');
  
  const fundId = parseInt(id || '1');
  const fund = fundsData.find(f => f.id === fundId) || fundsData[0];
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToInvestment = () => {
    navigate(`/fund-invest/${fund.id}`);
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">{fund.name}</h1>
      </div>
      
      <div className="p-6">
        <Card variant="elevated" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BarChart4 size={20} className="text-teal-500 mr-2" />
              <span className="font-medium text-dark-900 capitalize">{fund.category}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(fund.risk)}`}>
              {fund.risk} Risk
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <h2 className="text-3xl font-display font-bold text-dark-900 mr-2">{fund.return}%</h2>
            <div className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
              <TrendingUp size={12} className="inline mr-1" />
              {(fund.return - fund.threeYear).toFixed(1)}%
            </div>
          </div>
          
          <p className="text-dark-400 text-sm mb-4">1 Year Returns</p>
          
          <div className="grid grid-cols-3 gap-4 mb-1">
            <div>
              <p className="text-dark-400 text-xs mb-1">YTD</p>
              <p className="text-dark-900 font-medium">{fund.ytd}%</p>
            </div>
            <div>
              <p className="text-dark-400 text-xs mb-1">3 Year</p>
              <p className="text-dark-900 font-medium">{fund.threeYear}%</p>
            </div>
            <div>
              <p className="text-dark-400 text-xs mb-1">5 Year</p>
              <p className="text-dark-900 font-medium">{fund.fiveYear}%</p>
            </div>
          </div>
        </Card>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-4">
            {['returns', 'details', 'performance'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  'flex-1 text-center py-3 font-medium',
                  activeTab === tab ? 'text-teal-500 border-b-2 border-teal-500' : 'text-dark-400'
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="animate-fade-in">
            {activeTab === 'returns' && (
              <>
                <p className="text-dark-900 mb-6">{fund.details}</p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <Info size={20} className="text-blue-500 mr-3 mt-0.5" />
                    <p className="text-dark-800 text-sm">
                      Past performance does not guarantee future returns. Investment in mutual funds are subject to market risks.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <ReturnComparisonBar label="1 Month" value={fund.ytd * 0.3} benchmark={6.4} />
                  <ReturnComparisonBar label="6 Months" value={fund.ytd * 0.8} benchmark={10.2} />
                  <ReturnComparisonBar label="1 Year" value={fund.oneYear} benchmark={fund.oneYear * 0.9} />
                  <ReturnComparisonBar label="3 Years" value={fund.threeYear} benchmark={fund.threeYear * 0.85} />
                </div>
              </>
            )}
            
            {activeTab === 'details' && (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Fund Manager</span>
                    <span className="text-dark-900 font-medium">{fund.manager}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Fund Size (AUM)</span>
                    <span className="text-dark-900 font-medium">{fund.aum}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Expense Ratio</span>
                    <span className="text-dark-900 font-medium">{fund.expense}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Current NAV</span>
                    <span className="text-dark-900 font-medium">{fund.nav}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Launch Date</span>
                    <span className="text-dark-900 font-medium">{fund.inceptionDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-dark-400">Min. Investment</span>
                    <span className="text-dark-900 font-medium">₹{fund.minInvestment}</span>
                  </div>
                </div>
                
                <Card variant="outline" className="bg-amber-50 border-amber-100 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle size={20} className="text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-dark-800 font-medium mb-1">Risk Factors</p>
                      <p className="text-dark-800 text-sm">
                        This fund has a {fund.risk.toLowerCase()} risk profile and is suitable for investors with a {fund.risk === 'High' ? 'long-term' : fund.risk === 'Medium' ? 'medium-term' : 'short-term'} investment horizon.
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            )}
            
            {activeTab === 'performance' && (
              <>
                <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                  <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart4 size={48} className="text-gray-300" />
                  </div>
                  <div className="flex justify-between mb-2">
                    <button className="text-sm text-teal-500 font-medium flex items-center">
                      <CalendarDays size={16} className="mr-1" />
                      1 Year
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-teal-500 rounded-full mr-1"></div>
                        <span className="text-xs text-dark-400">Fund</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                        <span className="text-xs text-dark-400">Benchmark</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card variant="outline" className="mb-6">
                  <h3 className="font-medium text-dark-900 mb-4">How this fund compares</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-600 text-sm">Category Average</span>
                      <span className="text-dark-900 font-medium">{(fund.return * 0.85).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dark-600 text-sm">Top Fund</span>
                      <span className="text-dark-900 font-medium">{(fund.return * 1.1).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dark-600 text-sm">This Fund</span>
                      <span className="text-teal-500 font-medium">{fund.return}%</span>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-dark-400 text-xs mb-1">Min. Investment</p>
              <p className="text-dark-900 font-medium">₹{fund.minInvestment}</p>
            </div>
            <div>
              <p className="text-dark-400 text-xs mb-1">1Y Returns</p>
              <p className="text-green-500 font-medium">{fund.return}%</p>
            </div>
          </div>
          
          <Button fullWidth onClick={goToInvestment}>
            Invest Now
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper component for return comparison bars
const ReturnComparisonBar: React.FC<{ label: string; value: number; benchmark: number }> = ({ label, value, benchmark }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-dark-600 text-sm">{label}</span>
      <span className="text-dark-900 font-medium">{value.toFixed(1)}%</span>
    </div>
    <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
      <div
        className="h-full bg-teal-500 rounded-full"
        style={{ width: `${Math.min(value, 50)}%` }}
      ></div>
      <div
        className="h-full w-1 bg-gray-400 absolute top-0"
        style={{ left: `${Math.min(benchmark, 50)}%` }}
      ></div>
    </div>
  </div>
);

// Helper function to get badge color based on risk level
const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'High':
      return 'bg-red-100 text-red-600';
    case 'Medium':
      return 'bg-amber-100 text-amber-600';
    case 'Low':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-dark-600';
  }
};

export default FundDetails;
