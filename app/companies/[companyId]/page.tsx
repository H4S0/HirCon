import React from 'react';
import { getCompanyId } from '@/app/dashboard/company/companyEdit/[companyId]/page';
import Navbar from '@/app/components/LandingPageNavbar';

interface Params {
  companyId: string;
}

const page = async ({ params }: { params: Params }) => {
  const { companyId } = params;
  const companyData = await getCompanyId(companyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />
    </div>
  );
};

export default page;
