
import React, { useState } from 'react';
import { Users, Copy, Link as LinkIcon, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useWallet } from '@/context/WalletContext';

const ReferralCard = () => {
  const { connected, referralCode, referrals } = useWallet();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (!connected) {
      toast.error('Please connect your wallet to get a referral code');
      return;
    }
    
    navigator.clipboard.writeText(`https://spesbas.com/ref/${referralCode}`);
    setCopied(true);
    toast.success('Referral link copied to clipboard');
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="glass-card p-6 rounded-2xl w-full">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-green-100 mr-3">
          <Users className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-spesbas-dark">Referral Program</h2>
          <p className="text-sm text-spesbas-gray">Invite friends, earn bonus mining power</p>
        </div>
      </div>
      
      {connected ? (
        <>
          <div className="bg-white/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-spesbas-gray mb-2">Your referral link</p>
            <div className="flex">
              <Input 
                value={`https://spesbas.com/ref/${referralCode}`}
                readOnly
                className="bg-white border-r-0 rounded-r-none"
              />
              <Button
                onClick={handleCopy}
                className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white rounded-l-none"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/50 p-3 rounded-lg text-center">
              <p className="text-sm text-spesbas-gray mb-1">Total Referrals</p>
              <p className="text-xl font-semibold text-spesbas-dark">{referrals}</p>
            </div>
            <div className="bg-white/50 p-3 rounded-lg text-center">
              <p className="text-sm text-spesbas-gray mb-1">Bonus MP</p>
              <p className="text-xl font-semibold text-spesbas-dark">+{referrals * 5}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={handleCopy}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button
              className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white flex items-center justify-center"
              onClick={() => toast.info('Share dialog would open here')}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-white/50 rounded-lg p-6 text-center">
          <p className="text-spesbas-gray mb-4">Connect your wallet to get your referral code</p>
          <Button className="bg-spesbas-blue hover:bg-spesbas-blue/90 text-white">
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReferralCard;
