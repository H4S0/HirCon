import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import React from 'react';

const GetStarted = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <>
      {isAuthenticated ? (
        <Button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md">
          You are registered already
        </Button>
      ) : (
        <Link href={'/api/auth/login'}>
          <Button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md">
            Get Started
          </Button>
        </Link>
      )}
    </>
  );
};

export default GetStarted;
