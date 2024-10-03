import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';

export default function Home() {
  return (
    <>
      <RegisterLink>
        <Button>Register</Button>
      </RegisterLink>
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>
    </>
  );
}
