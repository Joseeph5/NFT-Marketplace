import { useEffect, useState, createContext, Context } from 'react';
import Web3Modal from 'web3modal';
import { ethers, providers, Signer } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

export interface ContextType {
  nftCurrency: string;
  currentAccount: string;
  connectWallet: () => void;
  fetchNFTs: () => void;
}

export const NFTContext: Context<ContextType | null> = createContext<ContextType | null>(
  {} as ContextType
);

const getMarketContract = (signerOrProvider: any) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTProvider = ({ children }: any) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
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

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://goerli.infura.io/v3/2a5061fc90534fddbc8e7dcd37b8d718'
    );
    const contract = getMarketContract(provider);
    const data = await contract.fetchMarketItems();
    console.log({ data });

    const nfts = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

        return {
          price,
          tokenId: tokenId.toNumber(),
          id: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );

    return nfts;
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <NFTContext.Provider
      value={{ nftCurrency, currentAccount, connectWallet, fetchNFTs }}>
      {children}
    </NFTContext.Provider>
  );
};
