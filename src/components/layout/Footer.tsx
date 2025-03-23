
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <div className="w-6 h-6 bg-spesbas-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="ml-2 text-sm font-semibold text-spesbas-dark">Spesbas</span>
            </Link>
            <p className="text-xs text-spesbas-gray mt-2">
              A click-to-mine platform with DBAS rewards
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Platform</h3>
              <div className="space-y-1">
                <Link to="/dashboard" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  Dashboard
                </Link>
                <Link to="/marketplace" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  Marketplace
                </Link>
                <Link to="/profile" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  Profile
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Resources</h3>
              <div className="space-y-1">
                <a href="#" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  FAQ
                </a>
                <a href="#" className="block text-xs text-spesbas-gray hover:text-spesbas-blue transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4">
              <a href="#" className="text-spesbas-gray hover:text-spesbas-blue transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-spesbas-gray hover:text-spesbas-blue transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-spesbas-gray hover:text-spesbas-blue transition-colors">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-xs text-spesbas-gray">
          <p>© {new Date().getFullYear()} Spesbas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
