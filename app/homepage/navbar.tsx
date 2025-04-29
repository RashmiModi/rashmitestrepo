'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import Image from 'next/image';

interface NavbarProps {
  cartCount: number;
  onAddToCart: (product: Product) => void;
  users: {
    name?: string;  // Make name optional
    email: string;
  }; // Allow name and email to be undefined
}

const navigation = [
  { name: 'Home', href: '/', roles: ['guest', 'user', 'marketing_admin1']  },
  { name: 'Dashboard', href: '/orders', roles: ['marketing_admin1'] },
  { name: 'Category', href: '/productcategory', roles: ['marketing_admin1'] },
  { name: 'Products', href: '/product/productlist', roles: ['marketing_admin1'] },
  { name: 'Shop', href: '/shop', roles: ['guest', 'user', 'marketing_admin1'] },
];

function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({  users }: NavbarProps) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();  // Make sure you import and use `useClerk` for signOut
  const { cartItems, removeFromCart,clearCart } = useCart();

  if (!isLoaded) return null;

  //const role = (user?.publicMetadata?.role as string) || 'guest';
  
  const isLoggedIn = !!user?.id;
  const userRole = user?.publicMetadata?.role || 'guest'; // assume you store role in Clerk publicMetadata

  const filteredNav = (() => {
    if (!isLoggedIn) {
      // If not logged in (guest)
      return [];
    }
  
    if (userRole === 'marketing_admin1') {
      // If logged in as marketing_admin1
      return navigation.filter(
        (item) => 
          item.name === 'Home' || 
          item.name === 'Category' || 
          item.name === 'User' || 
          item.name === 'Dashboard' || 
          item.name === 'Products'
      );
    }
  
    // If logged in but normal user
    return navigation.filter((item) => item.name === 'Home' || item.name === 'Shop');
  })();
  
  // Show 'Shop' only if the user is logged in and has a 'guest' or 'user' role
  
  // Show no links when logged out
 // const filteredNav = isLoggedIn ? navigation.filter((item) => item.name === 'Shop') : [];
  const userName = user?.username || 'Guest';
  const userImage = user?.imageUrl || '/default-avatar.png';

  const handleSignOut = async () => {
    await signOut();  // Call signOut from useClerk
    clearCart(); 
    // Optionally, you can redirect or update the UI after signing out
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-20xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Logo and navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto" width={20} height={20}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {filteredNav.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* User Info and Cart */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {isLoggedIn ? (
              <>
                {/* Profile Dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src={userImage}
                        alt="User" width={20} height={20}
                      />
                    </MenuButton>
                  </div>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-gray-700">
                      <div className="font-semibold">{userName}</div>
                      <div className="text-sm text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress || users.email}
                      </div>
                    </div>

                    <MenuItem as="a" href="/user-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </MenuItem>
                    <MenuItem
                      as="a"
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </MenuItem>
                  </MenuItems>
                </Menu>

                {/* Welcome message */}
                <span className="text-white px-4">Welcome, {userName}</span>
              </>
            ) : (
              <>
                {/* Show login/signup buttons when not logged in */}
                <Link href="/sign-in">
  <button className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4">
    Login
  </button>
</Link>
                <Link href="/sign-up">
                  <button className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {/* Cart */}
            <div className="relative ml-4">
              <Link href="/cart" className="bg-blue-600 p-2 rounded-full inline-flex items-center">
                🛒
                <span className="ml-1">({cartItems.length})</span>
              </Link>

              {/* Cart Dropdown */}
              {cartItems.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg">
                  <ul>
                    {cartItems.map((item: Product) => (
                      <li key={item.id} className="flex justify-between p-2 hover:bg-gray-200">
                        <span>{item.productname}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Disclosure>
  );
}
