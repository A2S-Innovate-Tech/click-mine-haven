
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import MiningCard from '@/components/dashboard/MiningCard';
import StatsCard from '@/components/dashboard/StatsCard';
import ReferralCard from '@/components/dashboard/ReferralCard';
import { Progress } from '@/components/ui/progress';
import { Award, ChevronUp } from 'lucide-react';

const Dashboard = () => {
  const { connected, miningPower, totalMined } = useWallet();
  const navigate = useNavigate();
  
  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);
  
  // Calculate level based on total mined
  const level = Math.min(Math.floor(totalMined / 2) + 1, 10);
  const levelProgress = (totalMined % 2) / 2 * 100;
  
  // Determine user tier based on level
  const getTier = () => {
    if (level >= 7) return 'Elite';
    if (level >= 3) return 'Advanced';
    return 'Starter';
  };
  
  const tier = getTier();
  
  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-spesbas-dark mb-2 animate-fade-in">Dashboard</h1>
        <p className="text-spesbas-gray mb-8 animate-fade-in">
          Overview of your mining activity and rewards
        </p>
        
        <div className="mb-8 animate-fade-in">
          <StatsCard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-in">
            <MiningCard />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <ReferralCard />
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-purple-100 mr-3">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-spesbas-dark">Mining Progression</h2>
              <p className="text-sm text-spesbas-gray">Level up to increase mining rewards</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`p-4 rounded-xl border-2 ${
              tier === 'Starter' 
                ? 'border-spesbas-blue bg-spesbas-blue/5' 
                : 'border-transparent bg-white/50'
            }`}>
              <h3 className="text-lg font-medium mb-1">Starter Tier</h3>
              <p className="text-sm text-spesbas-gray mb-3">Levels 1-2</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Basic mining rewards
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  1x Mining Multiplier
                </li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-xl border-2 ${
              tier === 'Advanced' 
                ? 'border-spesbas-blue bg-spesbas-blue/5' 
                : 'border-transparent bg-white/50'
            }`}>
              <h3 className="text-lg font-medium mb-1">Advanced Tier</h3>
              <p className="text-sm text-spesbas-gray mb-3">Levels 3-6</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Improved mining rewards
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  1.5x Mining Multiplier
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Marketplace discounts
                </li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-xl border-2 ${
              tier === 'Elite' 
                ? 'border-spesbas-blue bg-spesbas-blue/5' 
                : 'border-transparent bg-white/50'
            }`}>
              <h3 className="text-lg font-medium mb-1">Elite Tier</h3>
              <p className="text-sm text-spesbas-gray mb-3">Levels 7-10</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Premium mining rewards
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  2x Mining Multiplier
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Marketplace exclusive items
                </li>
                <li className="flex items-center">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                  Referral bonuses
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/50 p-4 rounded-xl">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Level {level}</span>
              <span className="text-sm text-spesbas-gray">Level {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-spesbas-gray mt-2">
              Mine {(2 - (totalMined % 2)).toFixed(2)} more DBAS to reach level {level + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
