
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  LogOut, 
  Copy, 
  Clock, 
  Award, 
  Coins, 
  BarChart, 
  Users, 
  History,
  Pickaxe
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { 
    connected, 
    address, 
    balance, 
    miningPower, 
    referralCode, 
    referrals, 
    totalMined, 
    disconnect 
  } = useWallet();
  
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
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };
  
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard');
  };
  
  // Dummy activity data
  const activities = [
    { type: 'mine', amount: 0.25, timestamp: Date.now() - 1000 * 60 * 5 },
    { type: 'mine', amount: 0.23, timestamp: Date.now() - 1000 * 60 * 15 },
    { type: 'mine', amount: 0.27, timestamp: Date.now() - 1000 * 60 * 30 },
    { type: 'levelUp', level: 2, timestamp: Date.now() - 1000 * 60 * 60 },
    { type: 'mine', amount: 0.22, timestamp: Date.now() - 1000 * 60 * 90 },
    { type: 'referral', user: 'User123', timestamp: Date.now() - 1000 * 60 * 120 },
  ];
  
  const formatTimestamp = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / (1000 * 60));
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="glass-card p-6 rounded-2xl mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 rounded-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} />
              <AvatarFallback className="bg-spesbas-blue/20">
                <User className="h-12 w-12 text-spesbas-blue" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-spesbas-dark">
                    Miner #{address.substring(2, 8)}
                  </h1>
                  <div className="flex flex-col md:flex-row items-center mt-1 mb-3 text-sm text-spesbas-gray">
                    <div className="font-mono flex items-center">
                      {address.substring(0, 6)}...{address.substring(address.length - 4)}
                      <button 
                        onClick={handleCopyAddress}
                        className="ml-1 text-spesbas-blue hover:text-spesbas-blue/80"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="hidden md:block mx-2">•</div>
                    <div>
                      Level {level} {tier} Miner
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50 mt-2 md:mt-0"
                  onClick={disconnect}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
              
              <div className="bg-white/50 p-3 rounded-lg mt-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-spesbas-gray">Level {level}</span>
                  <span className="text-xs text-spesbas-gray">Level {level + 1}</span>
                </div>
                <Progress value={levelProgress} className="h-1.5" />
                <p className="text-xs text-spesbas-gray mt-1">
                  Mine {(2 - (totalMined % 2)).toFixed(2)} more DBAS to reach level {level + 1}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-yellow-100 mr-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                </div>
                <span className="text-sm text-spesbas-gray">DBAS Balance</span>
              </div>
              <p className="text-2xl font-semibold text-spesbas-dark">{balance.toFixed(2)}</p>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-blue-100 mr-2">
                  <BarChart className="h-4 w-4 text-spesbas-blue" />
                </div>
                <span className="text-sm text-spesbas-gray">Mining Power</span>
              </div>
              <p className="text-2xl font-semibold text-spesbas-dark">{miningPower}</p>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-green-100 mr-2">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm text-spesbas-gray">Referrals</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-spesbas-dark">{referrals}</p>
                <div className="text-xs font-mono flex items-center bg-white/70 px-2 py-1 rounded">
                  {referralCode}
                  <button 
                    onClick={handleCopyReferralCode}
                    className="ml-1 text-spesbas-blue hover:text-spesbas-blue/80"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-purple-100 mr-2">
                  <Award className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-sm text-spesbas-gray">Total Mined</span>
              </div>
              <p className="text-2xl font-semibold text-spesbas-dark">{totalMined.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="activity" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-spesbas-dark mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex bg-white/50 p-3 rounded-lg"
                  >
                    <div className="mr-4">
                      {activity.type === 'mine' ? (
                        <div className="p-2 rounded-md bg-spesbas-blue/10">
                          <Pickaxe className="h-5 w-5 text-spesbas-blue" />
                        </div>
                      ) : activity.type === 'levelUp' ? (
                        <div className="p-2 rounded-md bg-purple-100">
                          <Award className="h-5 w-5 text-purple-500" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-md bg-green-100">
                          <Users className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-spesbas-dark">
                          {activity.type === 'mine' ? (
                            'Mined DBAS'
                          ) : activity.type === 'levelUp' ? (
                            `Reached Level ${activity.level}`
                          ) : (
                            `New Referral: ${activity.user}`
                          )}
                        </p>
                        <span className="text-xs text-spesbas-gray flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                      
                      {activity.type === 'mine' && (
                        <p className="text-sm text-spesbas-gray">
                          You mined <span className="text-spesbas-blue font-medium">+{activity.amount} DBAS</span>
                        </p>
                      )}
                      
                      {activity.type === 'levelUp' && (
                        <p className="text-sm text-spesbas-gray">
                          Unlocked new mining abilities
                        </p>
                      )}
                      
                      {activity.type === 'referral' && (
                        <p className="text-sm text-spesbas-gray">
                          Earned <span className="text-spesbas-blue font-medium">+5 Mining Power</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="flex items-center mx-auto">
                  <History className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rewards">
            <div className="glass-card rounded-2xl p-6 text-center">
              <h2 className="text-xl font-semibold text-spesbas-dark mb-4">Mining Rewards</h2>
              <p className="text-spesbas-gray mb-6">
                This section will track your mining rewards and statistics over time
              </p>
              
              <div className="bg-white/50 p-8 rounded-xl">
                <p className="text-sm text-spesbas-gray mb-2">Coming Soon</p>
                <h3 className="text-2xl font-bold text-spesbas-dark mb-4">
                  Advanced Mining Analytics
                </h3>
                <p className="text-spesbas-gray max-w-md mx-auto">
                  Track your mining performance, rewards history, and efficiency metrics
                  in our upcoming analytics dashboard.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="referrals">
            <div className="glass-card rounded-2xl p-6 text-center">
              <h2 className="text-xl font-semibold text-spesbas-dark mb-4">Referral Network</h2>
              <p className="text-spesbas-gray mb-6">
                This section will display your referral network and earnings
              </p>
              
              <div className="bg-white/50 p-8 rounded-xl">
                <p className="text-sm text-spesbas-gray mb-2">Coming Soon</p>
                <h3 className="text-2xl font-bold text-spesbas-dark mb-4">
                  Infinite-Level Referral System
                </h3>
                <p className="text-spesbas-gray max-w-md mx-auto">
                  Our advanced referral system will track your entire referral network
                  across infinite levels, providing you with commissions and bonuses.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
