'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';


const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <section
      className={`sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-sky-1 max-sm:hidden lg:w-[264px] ${
        isSidebarOpen ? 'lg:w-[64px]' : ''
      }`}
    >
      {/* Sidebar items when sidebar is open */}
      {isSidebarOpen && (
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                  'bg-blue-1': isActive && !isSidebarOpen,
                })}
              >
                <Image src={item.imgURL} alt={item.label} width={24} height={24} />
              </Link>
            );
          })}
        </div>
      )}

      {/* Sidebar labels when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                  'bg-blue-1': isActive && !isSidebarOpen,
                })}
              >
                <Image src={item.imgURL} alt={item.label} width={24} height={24} />
                <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        type="button"
        className={`mx-auto inline-flex items-center justify-center p-2.5 text-center text-sm font-medium text-sky-2 transition-transform`}
        style={{ width: '36px', height: '36px', transformOrigin: 'center' }}
      >
        <svg
          className="size-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
          style={{ transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1M13 5L9 1M13 5L9 9"
          />
        </svg>
      </button>
    </section>
  );
};

export default Sidebar;