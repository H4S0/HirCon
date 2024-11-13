<<<<<<< HEAD
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { UsersRound } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const DashboardNavbar = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between py-6 items-center px-4 md:px-8 border-b border-gray-300">
        <Link href={'/'}>
          <div className="flex items-center">
            <UsersRound className="mr-2" />
            <h2 className="text-lg font-semibold">HirCon</h2>
          </div>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href={'/dashboard'} className="hover:underline">
            Dashboard
          </Link>
          <Link href={'/dashboard/profileediting'} className="hover:underline">
            Profile
          </Link>
          <Link href={'/dashboard/company'} className="hover:underline">
            Company
          </Link>
        </div>
        <div className="hidden md:flex gap-5">
          {isLoading ? (
            <p className="font-bold">loading...</p>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <p className="font-semibold">{user?.given_name}</p>

              <LogoutLink>
                <Button>Logout</Button>
              </LogoutLink>
            </div>
          ) : (
            <>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-white border-b border-gray-300`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            href={'/dashboard'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href={'/dashboard/profileediting'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Profile
          </Link>
          <Link
            href={'/dashboard/company'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Company
          </Link>
          <p className="font-semibold">
            Welcome {isLoading ? 'loading...' : user?.given_name}
          </p>
          {isAuthenticated ? (
            <LogoutLink>
              <Button onClick={toggleMenu}>Logout</Button>
            </LogoutLink>
          ) : (
            <>
              <Link href="/register">
                <Button onClick={toggleMenu}>Register</Button>
              </Link>
              <Link href="/login">
                <Button onClick={toggleMenu}>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
=======
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { UsersRound } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const DashboardNavbar = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between py-6 items-center px-4 md:px-8 border-b border-gray-300">
        <Link href={'/'}>
          <div className="flex items-center">
            <UsersRound className="mr-2" />
            <h2 className="text-lg font-semibold">HirCon</h2>
          </div>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href={'/dashboard'} className="hover:underline">
            Dashboard
          </Link>
          <Link href={'/dashboard/profileediting'} className="hover:underline">
            Profile
          </Link>
          <Link href={'/dashboard/company'} className="hover:underline">
            Company
          </Link>
        </div>
        <div className="hidden md:flex gap-5">
          {isLoading ? (
            <p className="font-bold">loading...</p>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <p className="font-semibold">{user?.given_name}</p>

              <LogoutLink>
                <Button>Logout</Button>
              </LogoutLink>
            </div>
          ) : (
            <>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-white border-b border-gray-300`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            href={'/dashboard'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href={'/dashboard/profileediting'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Profile
          </Link>
          <Link
            href={'/dashboard/company'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Company
          </Link>
          <p className="font-semibold">
            Welcome {isLoading ? 'loading...' : user?.given_name}
          </p>
          {isAuthenticated ? (
            <LogoutLink>
              <Button onClick={toggleMenu}>Logout</Button>
            </LogoutLink>
          ) : (
            <>
              <Link href="/register">
                <Button onClick={toggleMenu}>Register</Button>
              </Link>
              <Link href="/login">
                <Button onClick={toggleMenu}>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
