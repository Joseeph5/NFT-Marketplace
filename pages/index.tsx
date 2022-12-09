import { useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Banner, CreatorCard } from '../components';
import images from '../assets';

const Home: NextPage = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Discover, collect, and sell <br /> extraordinary NFTs
            </>
          }
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}></div>
          <div
            className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
            ref={scrollRef}>
            {[1, 2, 3, 4, 5].map((creator, i) => (
              <CreatorCard key={i} rank={i + 1} creatorImage={images[`creator`]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
