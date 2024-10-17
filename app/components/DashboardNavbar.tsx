'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UsersRound, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const DashboardNavbar = () => {
  const { user, isLoading, error } = useKindeBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex item-center gap-3">
        <div className="flex items-center">
          <UsersRound className="mr-2" />
          <h2 className="text-lg font-semibold">HirCon</h2>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/profileediting">Profile</Link>
          <Link href="/dashboard/company">Company</Link>
        </div>
      </div>

      <div className="hidden md:flex gap-6 items-center">
        <p>
          Welcome{' '}
          <span className="font-semibold">
            {isLoading ? 'loading...' : user?.given_name}
          </span>
        </p>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-white w-full`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link href="/dashboard" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link href="/dashboard/profileediting" onClick={toggleMenu}>
            Profile
          </Link>
          <Link href="/dashboard/company" onClick={toggleMenu}>
            Company
          </Link>
          <p className="font-semibold">
            Welcome {isLoading ? 'loading...' : user?.given_name}
          </p>
          <LogoutLink>
            <Button onClick={toggleMenu}>Logout</Button>
          </LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
