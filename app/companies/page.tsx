import React from 'react';
import Navbar from '../components/LandingPageNavbar';
import prisma from '../utils/db';

const Page = async () => {
  const companyData = await prisma.company.findMany({
    select: {
      companyName: true,
      industry: true,
      location: true,
      companySize: true,
      companyDescription: true,
      website: true,
      id: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      <ul>
        {companyData.map((company, index) => (
          <li key={index} className="mb-2">
            {company.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
