
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { LayoutGrid, Store, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { connected, balance, connect, address } = useWallet();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
    { name: 'Marketplace', path: '/marketplace', icon: <Store className="h-4 w-4 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-spesbas-blue rounded-lg flex items-center justify-center animate-pulse-slow">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-spesbas-dark">Spesbas</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-secondary text-spesbas-blue font-medium' 
                    : 'text-spesbas-gray hover:bg-secondary/50 hover:text-spesbas-blue'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {connected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-spesbas-gray">
                  <span className="font-medium text-spesbas-blue">{balance}</span> DBAS
                </div>
                <Button variant="outline" className="text-xs font-mono">
                  {address.substring(0, 6)}...{address.substring(address.length - 4)}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connect} 
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white"
              >
                Connect Wallet
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-spesbas-dark p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-base ${
                  location.pathname === item.path
                    ? 'bg-secondary text-spesbas-blue font-medium'
                    : 'text-spesbas-gray hover:bg-secondary/50 hover:text-spesbas-blue'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {!connected && (
              <Button 
                onClick={() => {
                  connect();
                  setIsOpen(false);
                }} 
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white w-full mt-2"
              >
                Connect Wallet
              </Button>
            )}
            
            {connected && (
              <div className="flex flex-col space-y-2 py-2">
                <div className="text-sm text-spesbas-gray px-3">
                  Balance: <span className="font-medium text-spesbas-blue">{balance}</span> DBAS
                </div>
                <div className="text-sm text-spesbas-gray px-3 font-mono">
                  {address.substring(0, 6)}...{address.substring(address.length - 4)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
