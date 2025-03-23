
import React, { useState } from 'react';
import { Coins, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MarketplaceItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  mpReward: number;
  image: string;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  id,
  name,
  description,
  price,
  mpReward,
  image
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handlePurchase = () => {
    toast.info(`This is a simulated purchase for ${name}`);
  };
  
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <Coins className="h-3 w-3 text-yellow-500 mr-1" />
          {price} DBAS
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-spesbas-dark mb-1">{name}</h3>
        <p className="text-sm text-spesbas-gray mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-spesbas-gray">
            MP Reward: <span className="text-spesbas-blue font-medium">+{mpReward}</span>
          </div>
          <Button
            onClick={handlePurchase}
            variant="outline"
            className="text-xs h-8 bg-white hover:bg-spesbas-blue hover:text-white transition-colors"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItem;
