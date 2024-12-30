'use server';

import { parseWithZod } from '@conform-to/zod';
import prisma from './utils/db';
import {
  applicationSchema,
  companySchema,
  educationSchema,
  experienceSchema,
  jobAlertSchema,
  profileSchema,
} from './utils/zodSchemas';
import { redirect } from 'next/navigation';
import { requireUser } from './utils/requireUser';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SubmissionResult } from '@conform-to/react';

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
      userId: (await user).id,
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
      profileId: (await user).id,
    },
  });

  return redirect('/dashboard');
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
  return redirect('/dashboard');
}

export async function updateExperience(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, { schema: experienceSchema });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profileId = (await user).id;
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
  const user = requireUser();

  const submission = parseWithZod(formData, { schema: educationSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const profileId = (await user).id;
  const educationId = formData.get('educationId') as string;

  const data = await prisma.education.update({
    where: {
      profileId,
      id: educationId,
    },
    data: {
      institution: submission.value.institution,
      degree: submission.value.degree,
      startDate: submission.value.startYear,
      endDate: submission.value.endYear,
    },
  });

  return redirect(`/dashboard`);
}

export async function DeleteEducation(prevState: any, formData: FormData) {
  const user = requireUser();

  const educationId = formData.get('educationId') as string;

  const data = await prisma.education.delete({
    where: {
      id: educationId,
    },
  });

  return redirect('/dashboard');
}

export async function CreateCompany(prevState: any, formData: FormData) {
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
      image: submission.value.coverImage,
      ownerId: (await user).id,
    },
  });
  return redirect('/dashboard/company');
}

export async function UpdateCompany(prevState: any, formData: FormData) {
  const user = await requireUser();
  if (!user || !user.id) {
    throw new Error('User not authenticated');
  }

  const submission = parseWithZod(formData, { schema: companySchema });

  if (submission.status !== 'success') {
    console.error('Validation error:', submission.error);
    return submission.reply();
  }

  const companyId = formData.get('companyId') as string;

  if (!companyId) {
    throw new Error('Invalid companyId');
  }

  const companyUpdate = await prisma.company.update({
    where: { id: companyId },
    data: {
      companyName: submission.value.companyName,
      companySize: submission.value.companySize,
      website: submission.value.website,
      location: submission.value.location,
      companyDescription: submission.value.companyDescription,
      industry: submission.value.industry,
      image: submission.value.coverImage,
      ownerId: user.id,
    },
  });

  return redirect('/dashboard/company');
}

export async function CreateJobAlert(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: jobAlertSchema });

  if (submission.status !== 'success') {
    console.log('Validation Errors:', submission.errors);
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

  const company = await prisma.company.findFirst({
    where: {
      ownerId: user.id,
    },
  });

  if (!company) {
    console.error('No company found for this user.');
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
      companyId: company.id,
    },
  });

  return redirect('/dashboard/company');
}

export async function deleteJobAlert(formData: FormData) {
  const user = await requireUser();

  const jobid = formData.get('jobAlertId') as string;

  if (!jobid) {
    throw new Error('Job Alert ID is required.');
  }

  const deletedJobAlert = await prisma.jobAlert.delete({
    where: {
      id: jobid,
    },
  });

  return redirect('/dashboard/company');
}

type CreateApplicationResponse =
  | {
      status: string;
      message: string;
    }
  | SubmissionResult<string[]>;

export async function CreateApplication(
  prevState: any,
  formData: FormData
): Promise<CreateApplicationResponse> {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: applicationSchema });

  if (submission.status !== 'success') {
    return submission;
  }

  const { fullName, email, coverLetter, jobId } = submission.value;

  const jobAlert = await prisma.jobAlert.findUnique({
    where: { id: jobId },
  });

  if (!jobAlert) {
    return { status: 'error', message: 'Job alert not found.' };
  }

  const existingApplication = await prisma.application.findUnique({
    where: {
      jobId_userId: {
        jobId,
        userId: user.id,
      },
    },
  });

  if (existingApplication) {
    return { status: 'error', message: 'You have already applied' };
  }

  const newApplication = await prisma.application.create({
    data: {
      fullName,
      email,
      coverLetter,
      jobId,
      userId: user.id,
    },
  });

  if (newApplication) {
    return { status: 'success', message: 'Application submitted successfully' };
  } else {
    return { status: 'error', message: 'Something went wrong while applying' };
  }
}
