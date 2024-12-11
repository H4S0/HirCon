import EditingCompanyForm from '@/app/components/forms/EditingCompanyForm';
import prisma from '@/app/utils/db';
import React from 'react';

interface Params {
  companyId: string;
}

async function getData(companyId: string) {
  const data = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      companyName: true,
      companyDescription: true,
      companySize: true,
      location: true,
      website: true,
      industry: true,
    },
  });
  return data;
}

const EditCompanyPage = async ({ params }: { params: Params }) => {
  const { companyId } = await params;
  const companyData = await getData(companyId);

  return (
    <>
      <EditingCompanyForm data={companyData} companyId={companyId} />
    </>
  );
};

export default EditCompanyPage;
