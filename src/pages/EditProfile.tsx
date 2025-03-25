
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Mail, Phone } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useToast } from '@/hooks/use-toast';

const EditProfile: React.FC = () => {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    if (!name || !email || !phone) {
      toast({
        title: "Missing fields",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      });
      
      navigate('/profile');
    }, 1500);
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Edit Profile</h1>
      </div>
      
      <div className="p-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-3xl font-medium">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
              <Camera size={20} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            icon={<User size={18} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Input
            label="Email"
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            icon={<Phone size={18} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled
          />
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={goBack}
          >
            Cancel
          </Button>
          
          <Button
            className="flex-1"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
