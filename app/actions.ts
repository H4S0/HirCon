'use server';

import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from './utils/db';
import {
  educationSchema,
  experienceSchema,
  profileSchema,
} from './utils/zodSchemas';
import { redirect } from 'next/navigation';

export async function UpdateProfile(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

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

  if (existingProfile) {
    await prisma.profile.update({
      where: {
        id: existingProfile.id,
      },
      data: {
        description: submission.value.description,
        skills: submission.value.skills,
      },
    });
  } else {
    await prisma.profile.create({
      data: {
        description: submission.value.description,
        skills: submission.value.skills,
        userId: user.id,
      },
    });
  }

  return redirect('/dashboard');
}

export async function CreateEducation(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

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
    return redirect('/profile/create');
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
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

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
    return redirect('/profile/create');
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
