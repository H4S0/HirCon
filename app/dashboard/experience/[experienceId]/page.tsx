<<<<<<< HEAD
import ExperienceForm from '@/app/components/forms/ExperienceForm';
import prisma from '@/app/utils/db';
import React from 'react';

interface Params {
  experienceId: string;
}

async function getUserExperienceId(experienceId: string) {
  const userExperience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
    },
    select: {
      company: true,
      role: true,
      roleDescription: true,
      startDate: true,
      endDate: true,
    },
  });
  return userExperience;
}

const EditExperiencePage = async ({ params }: { params: Params }) => {
  const { experienceId } = await params;
  const experienceData = await getUserExperienceId(experienceId);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <ExperienceForm
        data={experienceData}
        experienceId={experienceId}
      />
    </div>
  );
};

export default EditExperiencePage;
=======
import ExperienceForm from '@/app/components/forms/ExperienceForm';
import prisma from '@/app/utils/db';
import React from 'react';

interface Params {
  experienceId: string;
}

async function getUserExperienceId(experienceId: string) {
  const userExperience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
    },
    select: {
      company: true,
      role: true,
      roleDescription: true,
      startDate: true,
      endDate: true,
    },
  });
  return userExperience;
}

const EditExperiencePage = async ({ params }: { params: Params }) => {
  const { experienceId } = await params;
  const experienceData = await getUserExperienceId(experienceId);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <ExperienceForm data={experienceData} experienceId={experienceId} />
    </div>
  );
};

export default EditExperiencePage;
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
