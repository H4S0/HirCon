import prisma from '@/app/utils/db';
import React from 'react';
import EducationForm from '@/app/components/forms/EducationForm';

interface Params {
  educationId: string;
}

async function getEducationById(educationId: string) {
  const data = await prisma.education.findUnique({
    where: { id: educationId },
    select: {
      institution: true,
      startDate: true,
      endDate: true,
      degree: true,
    },
  });
  return data;
}

const EditEducationPage = async ({ params }: { params: Params }) => {
  const { educationId } = await params;
  const educationData = await getEducationById(educationId);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <EducationForm data={educationData} educationId={educationId} />
    </div>
  );
};

export default EditEducationPage;
