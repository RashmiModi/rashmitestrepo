



import { CartProvider } from '@/app/context/CartContext'; // Make sure the import path is correct
import { AppProps } from 'next/app';
import CartClient from '../cart/CartClient';
import Example from '@/app/homepage/navbar';
import '@/styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
       <CartClient   {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;

