import { useEffect, useState, createContext, Context } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

interface ContextType {
  nftCurrency: string;
}

export const NFTContext: Context<ContextType | null> = createContext<ContextType | null>(
  {} as ContextType
);

export const NFTProvider = ({ children }: any) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  return <NFTContext.Provider value={{ nftCurrency }}>{children}</NFTContext.Provider>;
};
