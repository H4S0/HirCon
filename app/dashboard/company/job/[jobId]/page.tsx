import prisma from '@/app/utils/db';
import React from 'react';

interface Params {
  jobId: string;
}

export async function getData(jobId: string) {
  const data = await prisma.jobAlert.findUnique({
    where: {
      id: jobId,
    },
    select: {
      jobTitle: true,
      jobDescription: true,
      salary: true,
      jobType: true,
      remote: true,
      level: true,
      location: true,
    },
  });

  return data;
}

const page = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const jobAlertData = await getData(jobId);

  console.log('datanaiduu', jobAlertData);

  return <div>page</div>;
};

export default page;
