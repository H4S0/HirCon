'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import DashboardNavbar from '@/app/components/DashboardNavbar';

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      <Link href={'/dashboard/company/new'}>New Company</Link>
    </div>
  );
};

export default page;
