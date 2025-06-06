import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-start bg-[#D2691E] rounded-t-md px-8 md:px-24 pt-10 pb-5'>
      <div className='w-full flex flex-col gap-4 md:flex-row justify-between font-satoshi text-[#3C1E00]'>
        <div className='flex flex-col justify-start items-start gap-1 basis-1/3'>
          <img
            src='/images/mvj-logo.png'
            alt='MVJCE Logo'
            className='h-16 object-contain'
          />
          <p className='text-gray-300 text-sm font-light max-w-64'>
            MVJ College of Engineering Near ITPB, Whitefield, Bangalore-560067
          </p>
        </div>
        <div className='flex flex-col justify-start items-start gap-1 basis-1/3'>
          <p className='text-gray-300 font-bold text-lg max-w-64'>
            Quick Links
          </p>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            Home
          </Link>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            Contact
          </Link>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            Schedule
          </Link>
        </div>
        <div className='flex flex-col justify-start items-start gap-1 basis-1/3'>
          <p className='font-bold text-lg max-w-64'>Contact</p>
          <p className='text-sm font-light'>
            Phone: 080-4299-1022
          </p>
        </div>
        <div className='flex flex-col justify-start items-start gap-1 basis-1/3'>
          <p className='text-gray-300 font-bold text-lg max-w-64'>
            Connect with Us
          </p>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            Facebook
          </Link>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            Instagram
          </Link>
          <Link href='#' className='text-gray-300 text-sm font-light'>
            YouTube
          </Link>
        </div>
      </div>
      <div className='w-full flex justify-center font-satoshi text-sm mt-5 opacity-65'>
        <Link
          href={'https://github.com/SWAYAM-MVJCE/swayam-web'}
          target='_blank'
        >
          Built by Swayam Dev Team
        </Link>
      </div>
    </div>
  );
};

export default Footer;
