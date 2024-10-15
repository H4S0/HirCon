import React from 'react';
import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';

const DashboardNavbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex item-center gap-3">
        <div className="flex items-center">
          <UsersRound />
          <h2>HirCon</h2>
        </div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className="flex gap-6 items-center">
        <p>
          Welcome{' '}
          <span className="font-semibold">{(await user).given_name}</span>
        </p>

        <Link href="/dashboard/profileediting">Profile</Link>
        <Link href="/dashboard/company">Company</Link>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>
    </div>
  );
};

export default DashboardNavbar;
