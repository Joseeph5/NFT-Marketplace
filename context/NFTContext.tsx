import { useEffect, useState, createContext, Context } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

export interface ContextType {
  nftCurrency: string;
  currentAccount: string;
  connectWallet: () => void;
}

export const NFTContext: Context<ContextType | null> = createContext<ContextType | null>(
  {} as ContextType
);

export const NFTProvider = ({ children }: any) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, currentAccount, connectWallet }}>
      {children}
    </NFTContext.Provider>
  );
};
