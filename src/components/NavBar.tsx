
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Send, QrCode, CreditCard, User, CandlestickChart, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Send, label: 'Send', path: '/send' },
    { icon: QrCode, label: 'Scan', path: '/scan' },
    { icon: CreditCard , label: 'Payments', path: '/payments' },
    { icon: CandlestickChart, label: 'Investments', path: '/mutual-funds' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 animate-slide-up glass-effect">
      <div className="flex justify-between items-center max-w-md mx-auto overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'nav-item flex flex-col items-center px-2 min-w-[60px]',
              path === item.path ? 'active' : ''
            )}
          >
            <item.icon size={22} className={path === item.path ? 'text-teal-500' : 'text-dark-500'} />
            <span className={cn(
              'text-xs mt-1',
              path === item.path ? 'text-teal-500 font-medium' : 'text-dark-500'
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
