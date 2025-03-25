
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import NavBar from '@/components/NavBar';

const SendMoney: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  
  const navigate = useNavigate();
  
  const contacts = [
    { id: 1, name: 'John Smith', phone: '+91 98765 43210', avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', phone: '+91 87654 32109', avatar: 'SJ' },
    { id: 3, name: 'Michael Brown', phone: '+91 76543 21098', avatar: 'MB' },
    { id: 4, name: 'Emily Davis', phone: '+91 65432 10987', avatar: 'ED' },
    { id: 5, name: 'David Wilson', phone: '+91 54321 09876', avatar: 'DW' },
  ];
  
  const filteredContacts = searchQuery
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      )
    : contacts;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setAmount(value);
    }
  };
  
  const handleSend = () => {
    if (!amount || !selectedContact) return;
    
    navigate('/payment-success', {
      state: {
        amount,
        recipient: selectedContact,
        note,
        type: 'send'
      }
    });
  };
  
  const handleSelectContact = (contact: any) => {
    setSelectedContact(contact);
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-12 pb-6 relative border-b border-gray-100">
        <button
          className="absolute top-12 left-6 p-2"
          onClick={goBack}
        >
          <ChevronLeft size={24} />
        </button>
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Send Money</h1>
      </div>
      
      <div className="p-6">
        {selectedContact ? (
          <div className="flex flex-col items-center mb-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-teal-500 mb-2">
              {selectedContact.avatar}
            </div>
            <p className="text-dark-900 font-medium">{selectedContact.name}</p>
            <p className="text-dark-400 text-sm">{selectedContact.phone}</p>
            <button
              className="text-teal-500 text-sm font-medium mt-1"
              onClick={() => setSelectedContact(null)}
            >
              Change
            </button>
          </div>
        ) : (
          <>
            <Input
              placeholder="Search by name or phone number"
              icon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <div className="mb-6 max-h-60 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <Card
                    key={contact.id}
                    variant="outline"
                    className="flex items-center mb-2"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-teal-500 mr-3">
                      {contact.avatar}
                    </div>
                    <div>
                      <p className="text-dark-900 font-medium">{contact.name}</p>
                      <p className="text-dark-400 text-xs">{contact.phone}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-dark-400 py-4">No contacts found</p>
              )}
            </div>
          </>
        )}
        
        <div className="mb-6">
          <label className="text-sm font-medium text-dark-800 mb-2 block">Amount</label>
          <div className="flex items-center border-b-2 border-gray-200 py-2 mb-4">
            <span className="text-dark-900 text-3xl font-medium mr-2">₹</span>
            <input
              type="text"
              className="text-3xl font-medium text-dark-900 flex-1 focus:outline-none"
              placeholder="0"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          
          <Input
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => navigate('/request')}
          >
            Request Instead
          </Button>
          
          <Button
            className="flex-1"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            onClick={handleSend}
            disabled={!amount || !selectedContact}
          >
            Send ₹{amount || '0'}
          </Button>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default SendMoney;
