import { useEffect, useState, useContext, SetStateAction, Dispatch } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import { Button } from './';

interface MenuItemsProps {
  isMobile?: boolean;
  active?: string;
  setActive?: Dispatch<SetStateAction<string | undefined>>;
  setIsOpen?: Dispatch<SetStateAction<boolean | undefined>>;
}

interface ButtonGroupProps {
  setActive: Dispatch<SetStateAction<string | undefined>>;
  router: NextRouter;
}

const MenuItems = ({ isMobile, active, setActive }: MenuItemsProps) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nft';
      default:
        return '/';
    }
  };

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item: string, i) => (
        <li
          key={i}
          onClick={() => {
            if (setActive) {
              setActive(item);
            }
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          } 
          ${isMobile && 'my-5 text-xl'}`}>
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }: ButtonGroupProps) => {
  // const { connectWallet, currentAccount } = useContext(NFTContext);
  const currentAccount: boolean = true;

  return currentAccount ? (
    <div className="flexCenter">
      <Button
        btnName="Create"
        btnType="primary"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive('');
          router.push('/create-nft');
        }}
      />
    </div>
  ) : (
    <Button btnName="Connect" btnType="outline" classStyles="mx-2 rounded-lg" />
  );
};

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState<string | undefined>('Explore NFTs');
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const router = useRouter();
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter  cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="md:hidden dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              MagicSpace
            </p>
          </div>
        </Link>
      </div>
      <div className="md:hidden flex">
        <ul className="list-none flexCenter flex-row">
          <MenuItems active={active} setActive={setActive} />
        </ul>
        <div className="ml-4">
          <ButtonGroup setActive={setActive} router={router} />
        </div>
        <div className="flex flex-initial flex-row justify-end">
          <div className="flex items-center mr-2 ml-4">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <label
              htmlFor="checkbox"
              className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        {!isOpen ? (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'light' ? 'filter invert' : undefined}
          />
        ) : (
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="close"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'light' ? 'filter invert' : undefined}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
