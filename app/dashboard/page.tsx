<<<<<<< HEAD
import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '../utils/db';
import Image from 'next/image';
import Link from 'next/link';

async function getData(userId: string) {
  return prisma.profile.findMany({
    where: { userId },
  });
}

async function getEducationData(profileId: string) {
  return prisma.education.findMany({
    where: { profileId },
    select: {
      id: true,
      institution: true,
      startDate: true,
      endDate: true,
      degree: true,
    },
  });
}

async function getUserData(kindeId: string) {
  return prisma.user.findUnique({
    where: { kindeId },
    select: {
      firstName: true,
      lastName: true,
      profileImage: true,
      email: true,
    },
  });
}

async function getUserExperience(profileId: string) {
  return prisma.experience.findMany({
    where: { profileId },
    select: {
      company: true,
      role: true,
      roleDescription: true,
      startDate: true,
      endDate: true,
      id: true,
    },
  });
}

const ProfilePage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    redirect('/api/auth/login');
    return null;
  }

  const userData = await getUserData(user.id);
  const profileData = await getData(user.id);
  const educationData = await getEducationData(user.profileId);
  const experienceData = await getUserExperience(user.profileId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      {profileData.map((item) => (
        <div
          key={item.id}
          className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mb-10 mt-10"
        >
          {userData ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={userData.profileImage}
                  alt="Profile Image"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-gray-300 shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600">
                    Current status:{' '}
                    {item.employedStatus === 'OPENTOWORK'
                      ? 'Open to work'
                      : item.employedStatus === 'EMPLOYED'
                      ? 'Employed'
                      : 'Unemployed'}
                  </p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>

              <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  About
                </h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-6">
                  <span className="font-semibold mr-1">Contact :</span>
                  {item.contact}
                </p>
              </div>

              <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Skills
                </h3>
                {item.skills.length ? (
                  item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>Make sure to add some skills on the profile page!</p>
                )}
              </div>

              <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Experience
                </h3>
                {experienceData.length > 0 ? (
                  experienceData.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-gray-800 font-semibold">
                          {exp.company}
                        </h4>
                        <p className="text-gray-600">{exp.role}</p>
                        <p className="text-gray-500 text-sm">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <Link href={`/dashboard/experience/${exp.id}`}>
                        <button className="text-blue-500 text-sm hover:underline">
                          Edit
                        </button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No experience</p>
                )}
              </div>

              <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Education
                </h3>
                {educationData.length > 0 ? (
                  educationData.map((eduItem) => (
                    <div
                      key={eduItem.id}
                      className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-gray-800 font-semibold">
                          {eduItem.institution}
                        </h4>
                        <p className="text-gray-600">{eduItem.degree}</p>
                        <p className="text-gray-500 text-sm">
                          {eduItem.startDate} - {eduItem.endDate}
                        </p>
                      </div>
                      <Link href={`/dashboard/education/${eduItem.id}`}>
                        <button className="text-blue-500 text-sm hover:underline">
                          Edit
                        </button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No education records found. Go to your profile to add
                    education.
                    <Link
                      href={'/dashboard/profileediting'}
                      className="font-semibold underline ml-3"
                    >
                      Profile
                    </Link>
                  </p>
                )}
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
=======
import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import {redirect} from 'next/navigation';
import prisma from '../utils/db';
import Image from 'next/image';
import Link from 'next/link';

async function getData(userId: string) {
    return prisma.profile.findMany({
        where: {userId},
    });
}

async function getEducationData(profileId: string) {
    return prisma.education.findMany({
        where: {profileId},
        select: {
            id: true,
            institution: true,
            startDate: true,
            endDate: true,
            degree: true,
        },
    });
}

async function getUserData(kindeId: string) {
    return prisma.user.findUnique({
        where: {kindeId},
        select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            email: true,
        },
    });
}

async function getUserExperience(profileId: string) {
    return prisma.experience.findMany({
        where: {profileId},
        select: {
            company: true,
            role: true,
            roleDescription: true,
            startDate: true,
            endDate: true,
            id: true,
        },
    });
}

const ProfilePage = async () => {
    const {isAuthenticated, getUser} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();

    if (!isUserAuthenticated) {
        redirect('/api/auth/login');
        return null;
    }

    const userData = await getUserData(user.id);
    const profileData = await getData(user.id);
    const educationData = await getEducationData(user.profileId);
    const experienceData = await getUserExperience(user.profileId);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <DashboardNavbar/>
            {profileData.map((item) => (
                <div
                    key={item.id}
                    className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mb-10 mt-10"
                >
                    {userData ? (
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    src={userData.profileImage}
                                    alt="Profile Image"
                                    width={100}
                                    height={100}
                                    className="rounded-full border-2 border-gray-300 shadow-lg"
                                />
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {userData.firstName} {userData.lastName}
                                    </h2>
                                    <p className="text-gray-600">
                                        Current status:{' '}
                                        {item.employedStatus === 'OPENTOWORK'
                                            ? 'Open to work'
                                            : item.employedStatus === 'EMPLOYED'
                                                ? 'Employed'
                                                : 'Unemployed'}
                                    </p>
                                    <p className="text-sm text-gray-500">{item.location}</p>
                                </div>
                            </div>

                            <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    About
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                                <p className="mt-6">
                                    <span className="font-semibold mr-1">Contact :</span>
                                    {item.contact}
                                </p>
                            </div>

                            <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    Skills
                                </h3>
                                {item.skills.length ? (
                                    item.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm mr-2 mb-2"
                                        >
                      {skill}
                    </span>
                                    ))
                                ) : (
                                    <p>Make sure to add some skills on the profile page!</p>
                                )}
                            </div>

                            <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    Experience
                                </h3>
                                {experienceData.length > 0 ? (
                                    experienceData.map((exp) => (
                                        <div
                                            key={exp.id}
                                            className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <h4 className="text-gray-800 font-semibold">
                                                    {exp.company}
                                                </h4>
                                                <p className="text-gray-600">{exp.role}</p>
                                                <p className="text-gray-500 text-sm">
                                                    {exp.startDate} - {exp.endDate}
                                                </p>
                                            </div>
                                            <Link href={`/dashboard/experience/${exp.id}`}>
                                                <button className="text-blue-500 text-sm hover:underline">
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>No experience</p>
                                )}
                            </div>

                            <div className="w-full bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    Education
                                </h3>
                                {educationData.length > 0 ? (
                                    educationData.map((eduItem) => (
                                        <div
                                            key={eduItem.id}
                                            className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <h4 className="text-gray-800 font-semibold">
                                                    {eduItem.institution}
                                                </h4>
                                                <p className="text-gray-600">{eduItem.degree}</p>
                                                <p className="text-gray-500 text-sm">
                                                    {eduItem.startDate} - {eduItem.endDate}
                                                </p>
                                            </div>
                                            <Link href={`/dashboard/education/${eduItem.id}`}>
                                                <button className="text-blue-500 text-sm hover:underline">
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No education records found. Go to your profile to add
                                        education.
                                        <Link
                                            href={'/dashboard/profileediting'}
                                            className="font-semibold underline ml-3"
                                        >
                                            Profile
                                        </Link>
                                    </p>
                                )}
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
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
