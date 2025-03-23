
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  connected: boolean;
  address: string;
  balance: number;
  miningPower: number;
  referralCode: string;
  referrals: number;
  totalMined: number;
  connect: () => void;
  disconnect: () => void;
  mine: (amount: number) => void;
}

const defaultContext: WalletContextType = {
  connected: false,
  address: '',
  balance: 0,
  miningPower: 0,
  referralCode: '',
  referrals: 0,
  totalMined: 0,
  connect: () => {},
  disconnect: () => {},
  mine: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [miningPower, setMiningPower] = useState(10); // Default mining power
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState(0);
  const [totalMined, setTotalMined] = useState(0);

  // Check if wallet is already connected in localStorage
  useEffect(() => {
    const storedWalletData = localStorage.getItem('spesbas_wallet');
    if (storedWalletData) {
      try {
        const walletData = JSON.parse(storedWalletData);
        setConnected(true);
        setAddress(walletData.address);
        setBalance(walletData.balance || 0);
        setMiningPower(walletData.miningPower || 10);
        setReferralCode(walletData.referralCode || '');
        setReferrals(walletData.referrals || 0);
        setTotalMined(walletData.totalMined || 0);
      } catch (error) {
        console.error('Failed to parse wallet data:', error);
        localStorage.removeItem('spesbas_wallet');
      }
    }
  }, []);

  // Save wallet data to localStorage when it changes
  useEffect(() => {
    if (connected) {
      const walletData = {
        address,
        balance,
        miningPower,
        referralCode,
        referrals,
        totalMined,
      };
      localStorage.setItem('spesbas_wallet', JSON.stringify(walletData));
    }
  }, [connected, address, balance, miningPower, referralCode, referrals, totalMined]);

  const generateRandomAddress = () => {
    return '0x' + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const generateReferralCode = () => {
    return Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 36).toString(36)
    ).join('').toUpperCase();
  };

  const connect = () => {
    // Simulate connection delay
    toast.loading('Connecting wallet...');
    
    setTimeout(() => {
      const randomAddress = generateRandomAddress();
      const randomReferralCode = generateReferralCode();
      
      setConnected(true);
      setAddress(randomAddress);
      setReferralCode(randomReferralCode);
      
      toast.success('Wallet connected successfully');
    }, 1500);
  };

  const disconnect = () => {
    setConnected(false);
    setAddress('');
    setBalance(0);
    localStorage.removeItem('spesbas_wallet');
    toast.success('Wallet disconnected');
  };

  const mine = (amount: number) => {
    // Add amount to balance and update total mined
    setBalance(prev => {
      const newBalance = Number((prev + amount).toFixed(4));
      return newBalance;
    });
    
    setTotalMined(prev => {
      const newTotal = Number((prev + amount).toFixed(4));
      return newTotal;
    });
    
    // Every 10 mining operations, increase mining power by 1
    if (Math.floor(totalMined / 0.1) < Math.floor((totalMined + amount) / 0.1)) {
      setMiningPower(prev => prev + 1);
      toast.success('Mining power increased! +1 MP');
    }
  };

  const value = {
    connected,
    address,
    balance,
    miningPower,
    referralCode,
    referrals,
    totalMined,
    connect,
    disconnect,
    mine,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
