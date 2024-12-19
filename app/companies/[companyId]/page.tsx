import React from 'react';
import { getCompanyId } from '@/app/dashboard/company/companyEdit/[companyId]/page';
import Navbar from '@/app/components/LandingPageNavbar';

interface Params {
  companyId: string;
}

const Page = async ({ params }: { params: Params }) => {
  const { companyId } = params;
  const companyData = await getCompanyId(companyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />

      {/* Header Section with Logo, Company Name, and Description */}
      <header className="mt-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
        {/* Company Logo */}
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
          {companyData.image ? (
            <img
              src={companyData?.image}
              alt={`${companyData.companyName} Logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">No Logo</span>
          )}
        </div>

        {/* Company Name and Description */}
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

      {/* Company Info Section */}
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
