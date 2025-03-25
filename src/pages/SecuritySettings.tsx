
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Key, Fingerprint, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/Input';

const SecuritySettings: React.FC = () => {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const startChangingPin = () => {
    setIsChangingPin(true);
  };
  
  const cancelChangingPin = () => {
    setIsChangingPin(false);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
  };
  
  const handleSavePin = () => {
    if (!currentPin || !newPin || !confirmPin) {
      toast({
        title: "Missing fields",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (currentPin.length < 4 || newPin.length < 4 || confirmPin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN should be at least 4 digits",
        variant: "destructive"
      });
      return;
    }
    
    if (newPin !== confirmPin) {
      toast({
        title: "PIN mismatch",
        description: "New PIN and confirm PIN do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsChangingPin(false);
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      
      toast({
        title: "PIN Updated",
        description: "Your PIN has been updated successfully"
      });
    }, 1500);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your security settings have been updated"
    });
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Security Settings</h1>
      </div>
      
      <div className="p-6">
        <Card variant="outline" className="mb-6">
          <h3 className="font-medium text-dark-900 mb-4">Login & Authorization</h3>
          
          {isChangingPin ? (
            <div className="space-y-4">
              <Input
                label="Current PIN"
                placeholder="Enter current PIN"
                type="password"
                value={currentPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setCurrentPin(value);
                  }
                }}
                maxLength={6}
              />
              
              <Input
                label="New PIN"
                placeholder="Enter new PIN"
                type="password"
                value={newPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setNewPin(value);
                  }
                }}
                maxLength={6}
              />
              
              <Input
                label="Confirm New PIN"
                placeholder="Confirm new PIN"
                type="password"
                value={confirmPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setConfirmPin(value);
                  }
                }}
                maxLength={6}
              />
              
              <div className="flex space-x-4 mt-4">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={cancelChangingPin}
                >
                  Cancel
                </Button>
                
                <Button
                  className="flex-1"
                  onClick={handleSavePin}
                  isLoading={isLoading}
                >
                  Save PIN
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Key size={20} className="text-dark-500 mr-3" />
                  <div>
                    <p className="text-dark-900 font-medium">Change PIN</p>
                    <p className="text-dark-400 text-xs">Update your login PIN</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startChangingPin}
                >
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Fingerprint size={20} className="text-dark-500 mr-3" />
                  <div>
                    <p className="text-dark-900 font-medium">Fingerprint Login</p>
                    <p className="text-dark-400 text-xs">Use fingerprint to login</p>
                  </div>
                </div>
                <Switch 
                  checked={fingerprintEnabled} 
                  onCheckedChange={setFingerprintEnabled} 
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Eye size={20} className="text-dark-500 mr-3" />
                  <div>
                    <p className="text-dark-900 font-medium">Face ID</p>
                    <p className="text-dark-400 text-xs">Use Face ID to login</p>
                  </div>
                </div>
                <Switch 
                  checked={faceIdEnabled} 
                  onCheckedChange={setFaceIdEnabled} 
                />
              </div>
            </div>
          )}
        </Card>
        
        <Card variant="outline" className="mb-8">
          <h3 className="font-medium text-dark-900 mb-4">Additional Security</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <ShieldCheck size={20} className="text-dark-500 mr-3" />
                <div>
                  <p className="text-dark-900 font-medium">Two-Factor Authentication</p>
                  <p className="text-dark-400 text-xs">Add an extra layer of security</p>
                </div>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled} 
              />
            </div>
          </div>
        </Card>
        
        {!isChangingPin && (
          <Button
            fullWidth
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
