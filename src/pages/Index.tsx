
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const Index = () => {
  const { connected, connect } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-b from-white to-blue-50 min-h-[70vh] flex flex-col">
        <div className="container mx-auto px-4 pt-16 pb-32 flex flex-col items-center justify-center text-center flex-grow">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="bg-spesbas-blue/10 text-spesbas-blue text-xs font-medium px-3 py-1 rounded-full">
              Introducing Spesbas
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-spesbas-dark mb-6 max-w-3xl animate-fade-in">
            The Revolutionary <span className="text-spesbas-blue">Click-to-Mine</span> Platform
          </h1>
          
          <p className="text-spesbas-gray text-lg mb-10 max-w-2xl animate-fade-in">
            Mine DBAS tokens with just a click. Earn real rewards, build your mining power, and join a thriving community.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            {connected ? (
              <Button
                asChild
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white px-8 py-6 text-lg"
              >
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                onClick={connect}
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white px-8 py-6 text-lg"
              >
                Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            
            <Button
              asChild
              variant="outline"
              className="bg-white hover:bg-gray-50 border-gray-200 px-8 py-6 text-lg"
            >
              <Link to="/marketplace">
                Explore Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-spesbas-dark mb-4">How It Works</h2>
            <p className="text-spesbas-gray max-w-2xl mx-auto">
              Spesbas combines blockchain technology with a simple click-to-mine mechanism, allowing anyone to earn DBAS tokens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-spesbas-blue" />,
                title: "Click to Mine",
                description: "Simply click the mining button to earn DBAS tokens. No complex hardware required."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-spesbas-blue" />,
                title: "Build Mining Power",
                description: "Increase your mining power over time to earn more DBAS with each click."
              },
              {
                icon: <Users className="h-8 w-8 text-spesbas-blue" />,
                title: "Refer Friends",
                description: "Invite others to join Spesbas and earn bonus mining power for each referral."
              },
              {
                icon: <ShoppingCart className="h-8 w-8 text-spesbas-blue" />,
                title: "Use Marketplace",
                description: "Spend your DBAS tokens on digital goods and services in our marketplace."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="bg-spesbas-blue/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-spesbas-dark mb-2">{feature.title}</h3>
                <p className="text-spesbas-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-spesbas-light-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-spesbas-dark mb-4">Ready to Start Mining?</h2>
            <p className="text-spesbas-gray mb-8">
              Join thousands of users already mining DBAS tokens on Spesbas. It's simple, free, and rewarding.
            </p>
            
            {connected ? (
              <Button
                asChild
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white px-8 py-6 text-lg animate-pulse-slow"
              >
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                onClick={connect}
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white px-8 py-6 text-lg animate-pulse-slow"
              >
                Connect Wallet & Start Mining <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
