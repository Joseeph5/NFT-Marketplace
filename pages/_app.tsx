import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <div className='dark:bg-nft-dark bg-white min-h-screen'>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Script
        src='https://kit.fontawesome.com/9a0c2aa5e4.js'
        crossOrigin='anonymous'></Script>
    </ThemeProvider>
  );
}

export default MyApp;
