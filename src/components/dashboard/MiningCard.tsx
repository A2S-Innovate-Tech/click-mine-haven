
import React, { useState, useEffect } from 'react';
import { Pickaxe, Zap } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';

const MiningCard = () => {
  const { mine, connected, miningPower } = useWallet();
  const [isAnimating, setIsAnimating] = useState(false);
  const [miningEffects, setMiningEffects] = useState<React.ReactNode[]>([]);
  const [effectKey, setEffectKey] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [nextReward, setNextReward] = useState(0);

  useEffect(() => {
    const timer = cooldown > 0 && setInterval(() => setCooldown(c => c - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  useEffect(() => {
    // Calculate the next reward based on mining power
    setNextReward(Number((0.01 * (1 + miningPower / 100)).toFixed(4)));
  }, [miningPower]);

  const handleMine = () => {
    if (cooldown > 0) {
      toast.error(`Mining on cooldown (${cooldown}s remaining)`);
      return;
    }
    
    if (!connected) {
      toast.error('Please connect your wallet to mine');
      return;
    }
    
    setIsAnimating(true);
    
    // Generate a random position for the mining effect
    const randomX = Math.random() * 60 - 30; // -30px to 30px
    const randomY = Math.random() * 60 - 30; // -30px to 30px
    
    // Add a new mining effect
    setMiningEffects(prev => [
      ...prev,
      <div 
        key={effectKey} 
        className="absolute text-yellow-400 font-medium"
        style={{
          transform: `translate(${randomX}px, ${randomY}px)`,
          animation: 'fade-in 0.3s ease-out forwards, slide-up 1s ease-out forwards',
        }}
      >
        +{nextReward} DBAS
      </div>
    ]);
    setEffectKey(prev => prev + 1);
    
    // After the animation is done, mine and reset
    setTimeout(() => {
      mine(nextReward);
      setIsAnimating(false);
      // Clear old effects
      if (miningEffects.length > 5) {
        setMiningEffects([]);
      }
      setCooldown(3); // 3 second cooldown
    }, 1000);
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-md mx-auto overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-spesbas-dark mb-1">Click to Mine</h2>
          <p className="text-sm text-spesbas-gray">Earn DBAS by mining</p>
        </div>
        
        <div className="w-full bg-spesbas-light-gray h-1 rounded-full mb-4">
          <div 
            className="bg-spesbas-blue h-1 rounded-full transition-all duration-300"
            style={{ width: `${100 - (cooldown / 3) * 100}%` }}
          />
        </div>
        
        <div className="relative w-full flex justify-center mb-6">
          <div className="flex items-center justify-center w-28 h-28 rounded-full bg-spesbas-light-blue/20 mb-4">
            <div 
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isAnimating ? 'scale-110 bg-spesbas-light-blue/40' : 'bg-spesbas-light-blue/30'
              }`}
            >
              <Pickaxe 
                className={`h-10 w-10 text-spesbas-blue transition-all duration-300 ${
                  isAnimating ? 'rotate-12' : ''
                }`} 
              />
            </div>
          </div>
          {miningEffects.map(effect => effect)}
        </div>
        
        <div className="flex justify-between w-full mb-6">
          <div className="text-center">
            <p className="text-xs text-spesbas-gray">Next Reward</p>
            <p className="text-lg font-medium text-spesbas-dark">{nextReward} DBAS</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-spesbas-gray">Mining Power</p>
            <p className="text-lg font-medium text-spesbas-dark flex items-center justify-center">
              <Zap className="h-4 w-4 text-yellow-500 mr-1" /> {miningPower}
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleMine}
          disabled={cooldown > 0 || !connected}
          className={`mining-button w-full ${cooldown > 0 || !connected ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {cooldown > 0 ? `Mine (${cooldown}s)` : 'Mine DBAS'}
        </button>
        
        {!connected && (
          <p className="mt-4 text-xs text-spesbas-gray text-center">
            Connect your wallet to start mining
          </p>
        )}
      </div>
    </div>
  );
};

export default MiningCard;
