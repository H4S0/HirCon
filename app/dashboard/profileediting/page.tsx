import React from 'react';

import DashboardNavbar from '@/app/components/DashboardNavbar';
import PorfileEditingForm from '@/app/components/forms/PorfileEditingForm';
import prisma from '@/app/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import ProfileCreating from '@/app/components/forms/ProfileCreating';

async function getData(userId: string) {
  const data = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      description: true,
      skills: true,
      location: true,
      contact: true,
      employedStatus: true,
    },
  });

  return data;
}

const ProfileUpdating = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    return redirect('/api/auth/login');
  }

  const profileData = await getData(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      {profileData ? (
        <PorfileEditingForm data={profileData} />
      ) : (
        <ProfileCreating />
      )}
    </div>
  );
};

export default ProfileUpdating;
