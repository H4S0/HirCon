import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      <div className="flex-grow flex items-center justify-center">
        {session ? (
          <h2 className="text-2xl font-semibold text-green-600">
            Welcome, {session.given_name}
          </h2>
        ) : (
          <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            <h2 className="text-xl font-bold">No User Logged In</h2>
            <p>Please login to access the dashboard.</p>
          </div>
        )}
        <LogoutLink>Logout</LogoutLink>
      </div>
    </div>
  );
};

export default page;
