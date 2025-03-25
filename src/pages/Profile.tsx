
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, CreditCard, Shield, Bell, HelpCircle, LogOut, ChevronRight, Camera } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const profileMenuItems = [
    {
      icon: <CreditCard size={20} className="text-teal-500" />,
      title: 'Linked Accounts',
      description: 'Manage your payment methods',
      path: '/linked-accounts',
    },
    {
      icon: <Shield size={20} className="text-blue-500" />,
      title: 'Security Settings',
      description: 'Update PIN and security options',
      path: '/security-settings',
    },
    {
      icon: <Bell size={20} className="text-amber-500" />,
      title: 'Notifications',
      description: 'Manage notification preferences',
      path: '/notifications-settings',
    },
    {
      icon: <HelpCircle size={20} className="text-purple-500" />,
      title: 'Help & Support',
      description: 'Get assistance and FAQs',
      path: '/help',
    },
  ];
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToEditProfile = () => {
    navigate('/edit-profile');
  };
  
  const handleLogout = () => {
    toast({
      title: 'Logging out...',
    });
    
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Profile</h1>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="relative mr-4">
            <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-medium">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-medium text-dark-900">Jane Doe</h2>
            <p className="text-dark-400">+91 98765 43210</p>
            <button 
              className="text-teal-500 text-sm font-medium mt-1"
              onClick={goToEditProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
        
        <div className="space-y-3 mb-8">
          {profileMenuItems.map((item) => (
            <Card
              key={item.title}
              variant="outline"
              className="p-4"
              isHoverable
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-dark-900 font-medium">{item.title}</p>
                  <p className="text-dark-400 text-xs">{item.description}</p>
                </div>
                <ChevronRight size={18} className="text-dark-400" />
              </div>
            </Card>
          ))}
        </div>
        
        <Button
          variant="outline"
          fullWidth
          className="border-red-200 text-red-500 hover:bg-red-50"
          icon={<LogOut size={18} />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Profile;
