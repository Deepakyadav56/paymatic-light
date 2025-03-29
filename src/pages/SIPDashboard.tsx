
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  PauseCircle,
  PlayCircle,
  Plus,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import GlassCard from '@/components/ui-elements/GlassCard';
import NavBar from '@/components/NavBar';

// Sample SIP data
const sipData = [
  {
    id: '1',
    fundId: '1',
    fundName: 'Axis Bluechip Fund',
    category: 'Equity',
    amount: 1000,
    frequency: 'Monthly',
    active: true,
    startDate: '05 Jan, 2023',
    nextDate: '05 Jul, 2023',
    totalInvested: 6000,
    paymentMethod: 'UPI',
  },
  {
    id: '2',
    fundId: '3',
    fundName: 'SBI Balanced Advantage Fund',
    category: 'Hybrid',
    amount: 500,
    frequency: 'Monthly',
    active: true,
    startDate: '10 Mar, 2023',
    nextDate: '10 Jul, 2023',
    totalInvested: 2000,
    paymentMethod: 'Net Banking',
  },
  {
    id: '3',
    fundId: '5',
    fundName: 'Kotak Corporate Bond Fund',
    category: 'Debt',
    amount: 1000,
    frequency: 'Monthly',
    active: false,
    startDate: '15 Dec, 2022',
    nextDate: 'Paused',
    totalInvested: 6000,
    paymentMethod: 'UPI',
  }
];

const SIPDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'paused'>('active');
  
  const activeSIPs = sipData.filter(sip => sip.active);
  const pausedSIPs = sipData.filter(sip => !sip.active);
  
  const handleSIPUpdate = (sipId: string, active: boolean) => {
    // In a real app, this would update the SIP status via an API call
    console.log(`SIP ${sipId} is now ${active ? 'active' : 'paused'}`);
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 pb-20 animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate('/portfolio')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Manage SIPs</h1>
      </div>

      {/* SIP Summary */}
      <GlassCard className="mb-6 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">TOTAL SIP AMOUNT</p>
            <h2 className="text-2xl font-semibold">₹{activeSIPs.reduce((sum, sip) => sum + sip.amount, 0).toLocaleString()}/month</h2>
          </div>
          <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-teal-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">ACTIVE SIPs</p>
            <p className="font-medium">{activeSIPs.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">TOTAL INVESTED</p>
            <p className="font-medium">₹{sipData.reduce((sum, sip) => sum + sip.totalInvested, 0).toLocaleString()}</p>
          </div>
        </div>
      </GlassCard>

      {/* SIP List */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'active' | 'paused')}>
        <TabsList className="w-full bg-gray-100 p-1 mb-4">
          <TabsTrigger value="active" className="flex-1">
            Active ({activeSIPs.length})
          </TabsTrigger>
          <TabsTrigger value="paused" className="flex-1">
            Paused ({pausedSIPs.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeSIPs.length > 0 ? (
            activeSIPs.map(sip => (
              <GlassCard key={sip.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{sip.fundName}</h3>
                    <p className="text-xs text-gray-500">{sip.category}</p>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8"
                    onClick={() => navigate(`/sip-details/${sip.id}`)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">AMOUNT</p>
                    <p className="font-medium">₹{sip.amount}/month</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">NEXT DEBIT</p>
                    <p className="font-medium">{sip.nextDate}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <PauseCircle className="h-4 w-4 text-gray-400 mr-1" />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-sm font-normal text-gray-500">
                          Pause SIP
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Pause SIP</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-gray-700 mb-4">
                            Are you sure you want to pause this SIP? You can resume it anytime later.
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => {}}>Cancel</Button>
                            <Button onClick={() => handleSIPUpdate(sip.id, false)}>Pause SIP</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{sip.paymentMethod}</span>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No active SIPs found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="paused" className="space-y-4">
          {pausedSIPs.length > 0 ? (
            pausedSIPs.map(sip => (
              <GlassCard key={sip.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{sip.fundName}</h3>
                    <p className="text-xs text-gray-500">{sip.category}</p>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8"
                    onClick={() => navigate(`/sip-details/${sip.id}`)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">AMOUNT</p>
                    <p className="font-medium">₹{sip.amount}/month</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">PAUSED ON</p>
                    <p className="font-medium">15 Jun, 2023</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <PlayCircle className="h-4 w-4 text-teal-500 mr-1" />
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm font-normal text-teal-500"
                      onClick={() => handleSIPUpdate(sip.id, true)}
                    >
                      Resume SIP
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{sip.paymentMethod}</span>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No paused SIPs found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add New SIP Button */}
      <Button 
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full shadow-lg bg-teal-500 hover:bg-teal-600"
        onClick={() => navigate('/sip-setup/new')}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Disclaimer */}
      <div className="mt-6 mb-4 flex items-start space-x-2 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-400" />
        <p>
          SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly. 
          You can pause or cancel your SIP anytime.
        </p>
      </div>

      <NavBar />
    </div>
  );
};

export default SIPDashboard;
