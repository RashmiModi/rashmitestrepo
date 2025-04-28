'use client'; // Mark this file as a client component

import { ClerkProvider } from '@clerk/nextjs';

import { CartProvider } from '@/app/context/CartContext'; // Your CartContext
import NavbarWrapper from '@/components/NavbarWrapper'; // Navbar Component
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    
        <CartProvider>
          <html lang="en">
            <body className={inter.className}>
              
              <header>
                <NavbarWrapper />
              
              </header>

              <main>
             
                
                {children}</main>
            </body>
          </html>
        </CartProvider>
   
    </ClerkProvider>
  );
}
