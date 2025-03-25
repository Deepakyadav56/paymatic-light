
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FlashlightIcon, QrCode, X } from 'lucide-react';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';

const QRScan: React.FC = () => {
  const [flashOn, setFlashOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (scanned) {
      // Simulate a delay as if we're processing the scan
      const timer = setTimeout(() => {
        setScanResult({
          name: 'Coffee Shop',
          upiId: 'coffeeshop@upi',
          amount: '120'
        });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [scanned]);
  
  const handleScan = () => {
    setScanned(true);
  };
  
  const handleConfirm = () => {
    navigate('/payment-success', {
      state: {
        amount: scanResult.amount,
        recipient: {
          name: scanResult.name,
          upiId: scanResult.upiId
        },
        type: 'qr'
      }
    });
  };
  
  const handleCancel = () => {
    setScanned(false);
    setScanResult(null);
  };
  
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToManualEntry = () => {
    navigate('/qr-manual');
  };
  
  return (
    <div className="min-h-screen bg-black pb-20 relative">
      <div className="absolute top-12 left-6 z-10">
        <button
          className="p-2 bg-black/30 rounded-full backdrop-blur-sm"
          onClick={goBack}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
      </div>
      
      {!scanResult ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Camera view (simulated) */}
              <div className="w-72 h-72 bg-transparent relative">
                {/* Overlay with transparent center */}
                <div className="absolute inset-0 bg-black/70">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-teal-500 rounded-lg relative">
                      {/* Corner indicators */}
                      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-teal-500 rounded-tl"></div>
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-teal-500 rounded-tr"></div>
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-teal-500 rounded-bl"></div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-teal-500 rounded-br"></div>
                      
                      {/* Scanning animation */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-500 animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
                <button
                  className="bg-teal-500 text-white py-2 px-4 rounded-full w-full"
                  onClick={handleScan}
                >
                  Tap to Scan
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-28 left-0 right-0 flex justify-center space-x-6">
            <button
              className={`flex flex-col items-center text-white ${flashOn ? 'text-yellow-400' : 'text-white'}`}
              onClick={toggleFlash}
            >
              <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center mb-1">
                <FlashlightIcon size={24} />
              </div>
              <span className="text-xs">Flash</span>
            </button>
            
            <button
              className="flex flex-col items-center text-white"
              onClick={goToManualEntry}
            >
              <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center mb-1">
                <QrCode size={24} />
              </div>
              <span className="text-xs">Enter Code</span>
            </button>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="bg-white rounded-2xl p-6 w-80 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-dark-900">Confirm Payment</h2>
              <button onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {scanResult.name.charAt(0)}
                </div>
                <div>
                  <p className="text-dark-900 font-medium">{scanResult.name}</p>
                  <p className="text-dark-400 text-xs">{scanResult.upiId}</p>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-100 py-4 mb-4">
                <p className="text-dark-400 text-sm mb-1">Amount</p>
                <p className="text-dark-900 text-2xl font-medium">₹{scanResult.amount}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              
              <Button
                className="flex-1"
                onClick={handleConfirm}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <NavBar />
    </div>
  );
};

export default QRScan;
