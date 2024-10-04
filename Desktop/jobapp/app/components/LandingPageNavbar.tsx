'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { UsersRound } from 'lucide-react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between py-6 items-center px-4 md:px-8">
        <div className="flex items-center">
          <UsersRound className="mr-2" />
          <h2 className="text-lg font-semibold">HirCon</h2>
        </div>
        <div className="hidden md:flex gap-6">
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'/profile'}>Profile</Link>
          <Link href={'/company'}>Company</Link>
          <Link href={'/job'}>Find a job</Link>
        </div>
        <div className="hidden md:flex gap-5">
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-white`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link href={'/dashboard'} onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link href={'/profile'} onClick={toggleMenu}>
            Profile
          </Link>
          <Link href={'/company'} onClick={toggleMenu}>
            Company
          </Link>
          <Link href={'/job'} onClick={toggleMenu}>
            Find a job
          </Link>
          <RegisterLink>
            <Button onClick={toggleMenu}>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button onClick={toggleMenu}>Login</Button>
          </LoginLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
