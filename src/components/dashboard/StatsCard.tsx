
import React from 'react';
import { ArrowUp, Coins, Users, Clock } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const StatsCard = () => {
  const { balance, miningPower, totalMined, referrals } = useWallet();
  
  const stats = [
    {
      name: 'DBAS Balance',
      value: balance,
      icon: <Coins className="h-5 w-5 text-yellow-500" />,
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      name: 'Mining Power',
      value: miningPower,
      icon: <ArrowUp className="h-5 w-5 text-spesbas-blue" />,
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      name: 'Referrals',
      value: referrals,
      icon: <Users className="h-5 w-5 text-green-500" />,
      change: '0',
      changeType: 'neutral'
    },
    {
      name: 'Total Mined',
      value: totalMined.toFixed(2),
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      change: '+0.8%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div 
          key={stat.name} 
          className="glass-card p-4 rounded-xl flex flex-col animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 rounded-lg bg-white/80">
              {stat.icon}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              stat.changeType === 'positive' 
                ? 'bg-green-100 text-green-600' 
                : stat.changeType === 'negative'
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {stat.change}
            </div>
          </div>
          <p className="text-sm text-spesbas-gray mt-1">{stat.name}</p>
          <p className="text-2xl font-semibold text-spesbas-dark">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
