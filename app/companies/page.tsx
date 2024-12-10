import React from 'react';
import Navbar from '../components/LandingPageNavbar';
import prisma from '../utils/db';

async function getData() {
  const data = await prisma.company.findMany({
    select: {
      companyName: true,
    },
  });

  return data;
}

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />
    </div>
  );
};

export default page;
