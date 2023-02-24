import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';

import { Banner, BestCreators } from '../components';
import { NFTContext } from '../context/NFTContext';

const Home: NextPage = () => {
  const { fetchNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchNFTs()
      .then((nfts: any) => {
        console.log({ nfts });
      })
      .catch((err: any) => {
        console.log({ err });
      });
  }, []);

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-full minmd:w-4/5'>
        <Banner
          name={
            <>
              Discover, collect, and sell <br /> extraordinary NFTs
            </>
          }
          childStyles='md:text-4xl sm:text-2xl xs:text-xl text-left'
          parentStyle='justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'
        />
        <div>
          <BestCreators />
        </div>
      </div>
    </div>
  );
};

export default Home;
