
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, HelpCircle, MessageCircle, Mail, Phone, FileText } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';

const faqItems = [
  {
    question: 'How do I add money to my wallet?',
    answer: 'You can add money to your wallet through UPI, debit/credit card, or net banking. Go to Home → Add Money and select your preferred payment method.'
  },
  {
    question: 'How do I send money to someone?',
    answer: 'To send money, go to Home → Send Money. You can search for contacts or enter a UPI ID/mobile number directly.'
  },
  {
    question: 'What are the transaction limits?',
    answer: 'The transaction limit depends on the payment method and your KYC status. Basic KYC users can send up to ₹10,000 per transaction and ₹50,000 per month. Complete KYC users have higher limits.'
  },
  {
    question: 'How do I invest in mutual funds?',
    answer: 'Go to Home → Funds to explore available mutual funds. Select a fund, enter your investment amount, and proceed with payment.'
  },
  {
    question: 'Is my money safe?',
    answer: 'Yes, we use bank-grade security measures to protect your transactions and personal information. All payments are secured with 256-bit encryption and multi-factor authentication.'
  },
  {
    question: 'How can I recover my account if I forget my PIN?',
    answer: 'Go to the login screen and click on "Forgot PIN". You\'ll receive an OTP on your registered mobile number to reset your PIN.'
  },
];

const HelpSupport: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
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
        
        <h1 className="text-xl font-medium text-dark-900 text-center">Help & Support</h1>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-8">
          <Card
            variant="outline"
            className="p-4 bg-teal-50 border-teal-100"
            isHoverable
          >
            <div className="flex items-center">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <MessageCircle size={24} className="text-teal-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Live Chat</h3>
                <p className="text-dark-600 text-sm">Chat with our support team</p>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
          
          <Card
            variant="outline"
            className="p-4 bg-blue-50 border-blue-100"
            isHoverable
          >
            <div className="flex items-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Mail size={24} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Email Support</h3>
                <p className="text-dark-600 text-sm">support@payx.com</p>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
          
          <Card
            variant="outline"
            className="p-4 bg-green-50 border-green-100"
            isHoverable
          >
            <div className="flex items-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Phone size={24} className="text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-dark-900 mb-1">Call Us</h3>
                <p className="text-dark-600 text-sm">+91 1800-123-4567</p>
              </div>
              <ChevronRight size={20} className="text-dark-400" />
            </div>
          </Card>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-medium text-dark-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <Card
                key={index}
                variant="outline"
                className="overflow-hidden"
              >
                <button
                  className="flex items-center justify-between w-full p-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center">
                    <HelpCircle size={18} className="text-teal-500 mr-3" />
                    <h3 className="font-medium text-dark-900">{faq.question}</h3>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={cn(
                      "text-dark-400 transition-transform",
                      expandedFaq === index ? "transform rotate-180" : ""
                    )}
                  />
                </button>
                
                {expandedFaq === index && (
                  <div className="px-4 pb-4 pt-0 text-dark-600 border-t border-gray-100 mt-1 pl-11">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        <Button
          variant="outline"
          fullWidth
          icon={<FileText size={18} />}
        >
          View Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default HelpSupport;
