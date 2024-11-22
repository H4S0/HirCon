'use server';

import { parseWithZod } from '@conform-to/zod';
import prisma from './utils/db';
import {
  companySchema,
  educationSchema,
  experienceSchema,
  jobAlertSchema,
  profileSchema,
} from './utils/zodSchemas';
import { redirect } from 'next/navigation';
import { requireUser } from './utils/requireUser';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// CreateProfile action
export async function CreateProfile(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: profileSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.profile.create({
    data: {
      description: submission.value.description,
      skills: submission.value.skills,
      location: submission.value.location,
      employedStatus: submission.value.status,
      contact: submission.value.contact,
      userId: user.id,
    },
  });

  return redirect('/dashboard');
}

// UpdateProfile action
export async function UpdateProfile(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: profileSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const existingProfile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!existingProfile) {
    throw new Error('Profile not found');
  }

  await prisma.profile.update({
    where: {
      id: existingProfile.id,
    },
    data: {
      description: submission.value.description,
      skills: submission.value.skills,
      location: submission.value.location,
      contact: submission.value.contact,
      employedStatus: submission.value.status,
    },
  });

  return redirect('/dashboard');
}

export async function CreateEducation(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: educationSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    return redirect('/dashboard/profileediting');
  }

  const education = await prisma.education.create({
    data: {
      institution: submission.value.institution,
      degree: submission.value.degree,
      startDate: submission.value.startYear,
      endDate: submission.value.endYear,
      profileId: profile.id,
    },
  });

  return redirect('/dashboard/profileediting');
}

export async function CreateExperience(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: experienceSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: (await user).id,
    },
  });

  if (!profile) {
    return redirect('/dashboard/profileediting');
  }

  const experience = await prisma.experience.create({
    data: {
      company: submission.value.company,
      role: submission.value.role,
      startDate: submission.value.startYear,
      endDate: submission.value.endYear,
      roleDescription: submission.value.roleDescription,
      profileId: profile.id,
    },
  });
  return redirect('/dashboard/profileediting');
}

export async function updateExperience(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, { schema: experienceSchema });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profileId = user.id;
  const experienceId = formData.get('experienceId') as string;

  const data = await prisma.experience.update({
    where: {
      profileId,
      id: experienceId,
    },
    data: {
      company: submission.value.company,
      role: submission.value.role,
      startDate: submission.value.startYear,
      endDate: submission.value.endYear,
      roleDescription: submission.value.roleDescription,
    },
  });

  return redirect(`/dashboard/experience/${experienceId}`);
}

export async function updateEducation(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }
  const submission = parseWithZod(formData, { schema: educationSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profileId = (await user).id;
  const educationId = formData.get('educationId') as string;

  // Perform the database update with correctly parsed fields
  const data = await prisma.education.update({
    where: {
      profileId,
      id: educationId,
    },
    data: {
      institution: submission.value.institution,
      degree: submission.value.degree,
      startDate: submission.value.startYear, // corrected
      endDate: submission.value.endYear, // corrected
    },
  });

  // Redirect after successful update
  return redirect(`/dashboard`);
}

export async function CreateCompany(prevRes: any, formData = FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, { schema: companySchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: (await user).id,
    },
  });

  if (!profile) {
    return redirect('/dashboard/profileediting');
  }

  const data = await prisma.company.create({
    data: {
      companyName: submission.value.companyName,
      industry: submission.value.industry,
      location: submission.value.location,
      companySize: submission.value.companySize,
      companyDescription: submission.value.companyDescription,
      website: submission.value.website,
      ownerId: (await user).id,
    },
  });
  return redirect('/dashboard/company');
}

export async function UpdateCompany(prevState: any, formData: FormData) {}

export async function CreateJobAlert(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // Log formData before parsing to check its structure
  console.log(
    'Form Data before parsing:',
    Object.fromEntries(formData.entries())
  );

  const submission = parseWithZod(formData, { schema: jobAlertSchema });

  // Log the submission result
  console.log('Submission Data:', submission);

  // If validation failed, log the specific errors
  if (submission.status !== 'success') {
    console.log('Validation Errors:', submission.errors);
    return submission.reply(); // Return the error response
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: (await user).id,
    },
  });

  if (!profile) {
    return redirect('/dashboard/profileediting');
  }

  const data = await prisma.jobAlert.create({
    data: {
      jobTitle: submission.value.jobTitle,
      jobDescription: submission.value.jobDescription,
      location: submission.value.location,
      remote: submission.value.remote,
      jobType: submission.value.jobType,
      level: submission.value.level,
      salary: submission.value.salary,
      companyId: (await user).id,
    },
  });

  return redirect('/dashboard/company');
}
