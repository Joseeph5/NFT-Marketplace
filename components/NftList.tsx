import React, { useState } from 'react';
import { SearchBar } from './';

function NftList() {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  const onHandleSearch = (value: string) => {
    // const filteredNfts = nfts.filter(({ name }) =>
    //   name.toLowerCase().includes(value.toLowerCase())
    // );
    // if (filteredNfts.length === 0) {
    //   setNfts(nftsCopy);
    // } else {
    //   setNfts(filteredNfts);
    // }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className="mt-10">
      <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Hot NFT
        </h1>
        <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
          <SearchBar
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
            handleSearch={onHandleSearch}
            clearSearch={onClearSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default NftList;
