
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketplaceItem from '@/components/marketplace/MarketplaceItem';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy marketplace data
  const items = [
    {
      id: '1',
      name: 'Mining Booster: Tier 1',
      description: 'Boost your mining power by 5% for 7 days',
      price: 10.50,
      mpReward: 5,
      image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop',
      category: 'boosters'
    },
    {
      id: '2',
      name: 'Mining Booster: Tier 2',
      description: 'Boost your mining power by 10% for 7 days',
      price: 25.00,
      mpReward: 12,
      image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002&auto=format&fit=crop',
      category: 'boosters'
    },
    {
      id: '3',
      name: 'Premium Avatar',
      description: 'Unique avatar for your profile with special effects',
      price: 15.75,
      mpReward: 3,
      image: 'https://images.unsplash.com/photo-1566410824233-a8002ceff1fb?q=80&w=1974&auto=format&fit=crop',
      category: 'avatars'
    },
    {
      id: '4',
      name: 'Referral Pack',
      description: 'Increase your referral bonus by 5% permanently',
      price: 50.00,
      mpReward: 20,
      image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?q=80&w=2071&auto=format&fit=crop',
      category: 'upgrades'
    },
    {
      id: '5',
      name: 'Auto-Miner: Basic',
      description: 'Automatically mines once every hour for 3 days',
      price: 30.25,
      mpReward: 15,
      image: 'https://images.unsplash.com/photo-1611322353374-a3a30b804df6?q=80&w=2069&auto=format&fit=crop',
      category: 'automation'
    },
    {
      id: '6',
      name: 'Premium Theme Pack',
      description: 'Unlock 5 premium themes for your dashboard',
      price: 12.00,
      mpReward: 4,
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1964&auto=format&fit=crop',
      category: 'cosmetics'
    },
    {
      id: '7',
      name: 'Mining Efficiency Module',
      description: 'Permanently increases your mining efficiency by 3%',
      price: 75.50,
      mpReward: 30,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      category: 'upgrades'
    },
    {
      id: '8',
      name: 'VIP Badge',
      description: 'Exclusive VIP badge for your profile',
      price: 40.00,
      mpReward: 10,
      image: 'https://images.unsplash.com/photo-1521790361543-f645cf042ec4?q=80&w=2069&auto=format&fit=crop',
      category: 'cosmetics'
    }
  ];
  
  // Filter items based on search query
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const categories = ['all', 'boosters', 'upgrades', 'automation', 'cosmetics', 'avatars'];
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-spesbas-dark mb-2 animate-fade-in">Marketplace</h1>
        <p className="text-spesbas-gray mb-8 animate-fade-in">
          Browse and purchase items with your DBAS tokens
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spesbas-gray h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto w-full flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="md:w-auto w-full flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-8 animate-fade-in">
          <TabsList className="mb-6">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(category === 'all' ? filteredItems : filteredItems.filter(item => item.category === category))
                  .map((item, index) => (
                    <div 
                      key={item.id} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <MarketplaceItem {...item} />
                    </div>
                  ))}
              </div>
              
              {(category === 'all' ? filteredItems : filteredItems.filter(item => item.category === category)).length === 0 && (
                <div className="text-center py-16">
                  <p className="text-spesbas-gray">No items found. Try a different search or category.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
