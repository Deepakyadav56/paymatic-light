
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, BellRing, Mail, ShoppingBag, CreditCard, BarChart4 } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    paymentNotifications: true,
    fundUpdates: true,
    offerAlerts: false,
    emailNotifications: true,
    activitySummary: true,
    transactionAlerts: true,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated"
    });
    
    navigate('/profile');
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Notifications</h1>
      </div>
      
      <div className="p-6">
        <Card variant="outline" className="mb-6">
          <h3 className="font-medium text-dark-900 mb-4">Push Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Payment Notifications</p>
                  <p className="text-dark-400 text-xs">Get notified about payments and transfers</p>
                </div>
              </div>
              <Switch 
                checked={settings.paymentNotifications} 
                onCheckedChange={() => handleToggle('paymentNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <BarChart4 size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Fund Updates</p>
                  <p className="text-dark-400 text-xs">Get updates about your investments</p>
                </div>
              </div>
              <Switch 
                checked={settings.fundUpdates} 
                onCheckedChange={() => handleToggle('fundUpdates')} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <ShoppingBag size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Offer Alerts</p>
                  <p className="text-dark-400 text-xs">Get notified about new offers and deals</p>
                </div>
              </div>
              <Switch 
                checked={settings.offerAlerts} 
                onCheckedChange={() => handleToggle('offerAlerts')} 
              />
            </div>
          </div>
        </Card>
        
        <Card variant="outline" className="mb-8">
          <h3 className="font-medium text-dark-900 mb-4">Email Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Mail size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Email Notifications</p>
                  <p className="text-dark-400 text-xs">Receive important updates via email</p>
                </div>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleToggle('emailNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <BellRing size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Activity Summary</p>
                  <p className="text-dark-400 text-xs">Receive weekly account activity summary</p>
                </div>
              </div>
              <Switch 
                checked={settings.activitySummary} 
                onCheckedChange={() => handleToggle('activitySummary')} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <CreditCard size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Transaction Alerts</p>
                  <p className="text-dark-400 text-xs">Get emails for each transaction</p>
                </div>
              </div>
              <Switch 
                checked={settings.transactionAlerts} 
                onCheckedChange={() => handleToggle('transactionAlerts')} 
              />
            </div>
          </div>
        </Card>
        
        <Button
          fullWidth
          onClick={handleSave}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
