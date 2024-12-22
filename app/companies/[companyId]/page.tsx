import React from 'react';
import Navbar from '@/app/components/LandingPageNavbar';
import Image from 'next/image';
import prisma from '@/app/utils/db';
import { getCompanyId } from '@/app/dashboard/company/companyEdit/[companyId]/page';
import JobAlert from '@/app/components/JobAlert';

interface Params {
  companyId: string;
}

async function getJobByCompanyId(companyId: string) {
  const data = await prisma.jobAlert.findMany({
    where: {
      companyId: companyId,
    },
    select: {
      jobTitle: true,
      jobDescription: true,
      salary: true,
      jobType: true,
      remote: true,
      level: true,
      location: true,
      id: true,
    },
  });
  return data;
}

const Page = async ({ params }: { params: Params }) => {
  const { companyId } = await params;
  const companyData = await getCompanyId(companyId);
  const jobAlertData = await getJobByCompanyId(companyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />

      <header className="mt-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
          {companyData.image ? (
            <Image
              src={companyData?.image}
              alt={`${companyData.companyName} Logo`}
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <span className="text-gray-500 text-sm">No Logo</span>
          )}
        </div>

        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <h1 className="text-4xl font-bold text-gray-800">
            {companyData.companyName || 'Company Name'}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {companyData.companyDescription ||
              'No description available for this company.'}
          </p>
        </div>
      </header>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Company Size</h2>
          <p className="mt-2 text-gray-600">
            {companyData.companySize || 'Not specified'}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Location</h2>
          <p className="mt-2 text-gray-600">
            {companyData.location || 'No location provided'}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Industry</h2>
          <p className="mt-2 text-gray-600">
            {companyData.industry || 'Industry not specified'}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Website</h2>
          {companyData.website ? (
            <a
              href={companyData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-500 hover:underline"
            >
              {companyData.website}
            </a>
          ) : (
            <p className="mt-2 text-gray-600">No website available</p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <hr className="border-gray-300 my-8" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Active Job Alerts
        </h2>
        <JobAlert data={jobAlertData} currentRoute="/" />
      </section>

      <footer className="mt-16 text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()}{' '}
          {companyData.companyName || 'Company Name'}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Page;
