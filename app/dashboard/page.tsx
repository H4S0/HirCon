import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '../utils/db';
import Image from 'next/image';

async function getData(userId: string) {
  const data = await prisma.profile.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
}

async function getUserData(kindeId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      kindeId: kindeId,
    },
    select: {
      firstName: true,
      lastName: true,
      profileImage: true,
      email: true,
    },
  });
  return userData;
}

const ProfilePage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    return redirect('/api/auth/login');
  }

  const userData = await getUserData(user.id);
  const profileData = await getData(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      {profileData.map((item) => (
        <div
          key={item.id} // Use item.id here
          className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mb-10"
        >
          {userData ? (
            <div className="flex flex-col items-center gap-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={userData.profileImage}
                  alt="Profile Image"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-gray-300"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600">Frontend Developer at JobApp</p>
                  <p className="text-sm text-gray-500">
                    Sarajevo, Bosnia and Herzegovina
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className="w-full bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  About
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              {/* Skills Section */}
              <div className="w-full bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Skills
                </h3>
                <p className="text-gray-600">{item.skills.join(', ')}</p>
              </div>

              {/* Experience Section */}
              <div className="w-full bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Experience
                </h3>
                <p className="text-gray-600">
                  Frontend Developer at JobApp (2023 - Present)
                </p>
                <p className="text-gray-500 text-sm">
                  Responsible for building and maintaining user-facing features.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
