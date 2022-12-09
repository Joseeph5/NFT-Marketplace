import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Banner, CreatorCard } from '../components';
import images from '../assets';
import { useTheme } from 'next-themes';
import { NftList } from '../components/';

const Home: NextPage = () => {
  const parentRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState<Boolean>(false);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      if (current) {
        current.scrollLeft -= scrollAmount;
      }
    } else {
      if (current) {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current && parent) {
      if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
      return setHideButtons(true);
    }
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

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
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}>
              {[1, 2, 3, 4, 5].map((creator, i) => (
                <CreatorCard key={i} rank={i + 1} creatorImage={images[`creator`]} />
              ))}
              {!hideButtons && (
                <div>
                  <div
                    onClick={() => handleScroll('left')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={theme === 'light' ? 'filter invert' : undefined}
                    />
                  </div>
                  <div
                    onClick={() => handleScroll('right')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={theme === 'light' ? 'filter invert' : undefined}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <NftList />
        </div>
      </div>
    </div>
  );
};

export default Home;
