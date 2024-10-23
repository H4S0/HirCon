import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '../utils/db';

async function getData(userId: string) {
  const data = await prisma.profile.findMany({
    where: {
      userId: userId,
    },
  });
  return data;
}

const page = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      <div>
        <h2>Data</h2>
        {data.map((item) => (
          <>
            <h2>{item.description}</h2>
          </>
        ))}
      </div>
    </div>
  );
};

export default page;
