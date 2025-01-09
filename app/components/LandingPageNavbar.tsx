'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { UsersRound } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Navbar = () => {
  const { getUser, isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getUser();

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
          <Link href={'/activejobs'} className="hover:underline">
            Jobs
          </Link>
          <Link href={'/companies'} className="hover:underline">
            Companies
          </Link>
        </div>
        <div className="hidden md:flex gap-5">
          {isLoading ? (
            <p className="font-bold">loading...</p>
          ) : isAuthenticated ? (
            <div className="grid grid-cols-2 items-center">
              <p>{user?.given_name}</p>
              <LogoutLink>
                <Button>Logout</Button>
              </LogoutLink>
            </div>
          ) : (
            <>
              <RegisterLink>
                <Button>Register</Button>
              </RegisterLink>
              <LoginLink>
                <Button>Login</Button>
              </LoginLink>
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
            href={'/profile'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Profile
          </Link>
          <Link
            href={'/company'}
            onClick={toggleMenu}
            className="hover:underline"
          >
            Company
          </Link>
          <Link href={'/job'} onClick={toggleMenu} className="hover:underline">
            Find a job
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

export default Navbar;
