import React from 'react';
import Navbar from '../components/LandingPageNavbar';
import prisma from '../utils/db';
import CompanyCard from '../components/CompanyCard';
import { Input } from '@/components/ui/input';

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
      <Input />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companyData.map((company, index) => (
          <CompanyCard company={company} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Page;
