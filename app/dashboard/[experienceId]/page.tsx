import React from 'react';

interface Params {
  experienceId: string;
}

async function getUserExperienceId(educationId: string) {}

const EditExperiencePage = async ({ params }: { params: Params }) => {
  const { experienceId } = await params;
  const experienceData = await getUserExperienceId(experienceId);

  return <div>page</div>;
};

export default EditExperiencePage;
