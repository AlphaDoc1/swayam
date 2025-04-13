'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='w-screen relative flex flex-row items-center justify-between md:px-14 px-4 py-4 z-10 bg-[#EFE7DE]'>
      <Link href='/'>
        <Image
          src='/images/mvj-logo.png'
          alt='MVJ Logo'
          width={140}
          height={70}
          className='h-10 md:h-20 w-auto object-contain hover:scale-105 transition duration-200'
        />
      </Link>
      <Link href='/'>
        <Image
          src='/images/swayam-logo.png'
          alt='Swayam Logo'
          width={140}
          height={60}
          className='h-10 md:h-20 w-auto object-contain -ml-4 md:ml-0 hover:scale-105 transition duration-200'
        />
      </Link>
      <div className='hidden md:flex flex-row items-center justify-evenly gap-6 text-md font-satoshi text-[#3C1E00]'>
        <Link
          href='#'
          className='transition hover:text-[#8B0000] hover:scale-105 duration-300'
        >
          Home
        </Link>
        <Link
          href='#featured'
          className='transition hover:text-rose-300 hover:scale-105 duration-300'
        >
          Events
        </Link>
        <Link
          href='#'
          className='transition hover:text-rose-300 hover:scale-105 duration-300'
        >
          Contact
        </Link>
      </div>
      <div className='md:hidden'>
        <button onClick={toggleMenu}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className='md:hidden absolute flex flex-col gap-3 font-satoshi top-20 left-0 bg-black bg-opacity-35 w-full py-6 px-8 rounded-md shadow-md'>
          <Link href='#'>Home</Link>
          <Link href='#featured'>Events</Link>
          <Link href='#'>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
