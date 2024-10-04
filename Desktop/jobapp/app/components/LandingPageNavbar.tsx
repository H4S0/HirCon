import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between py-6 items-center">
        <h2>HirCon</h2>
        <div className="flex gap-6">
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'/profile'}>Profile</Link>
          <Link href={'/company'}>Company</Link>
          <Link href={'/job'}>Find a job</Link>
        </div>
        <div className="flex gap-5">
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
