import React from 'react';
import Link from 'next/link';
import { UsersRound } from 'lucide-react';

const DashboardNavbar = () => {
  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex item-center gap-3">
        <div className="flex items-center">
          <UsersRound />
          <h2>HirCon</h2>
        </div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className="flex gap-6">
        <Link href="/dashboard/profileediting">Profile</Link>
        <Link href="/dashboard/company">Company</Link>
      </div>
    </div>
  );
};

export default DashboardNavbar;
