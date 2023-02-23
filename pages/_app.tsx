import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import { NFTProvider } from '../context/NFTContext';
import { NavBar, Footer } from '../components/';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid Hydration Mismatch
  if (!mounted) {
    return null;
  }
  return (
    <NFTProvider>
      <ThemeProvider attribute='class'>
        <div className='dark:bg-nft-dark bg-white min-h-screen'>
          <NavBar />
          <div className='pt-65'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <Script
          src='https://kit.fontawesome.com/9a0c2aa5e4.js'
          crossOrigin='anonymous'></Script>
      </ThemeProvider>
    </NFTProvider>
  );
}

export default MyApp;
