'use server';

import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from './utils/db';
import { profileSchema } from './utils/zodSchemas';
import { redirect } from 'next/navigation';

export async function UpdateProfile(prevState: any, formData: FormData) {
  // Server-side session handling
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

  // Store profile in database
  const response = await prisma.profile.create({
    data: {
      description: submission.value.description,
      currentStatus: submission.value.currentStatus,
      skills: submission.value.skills,
      education: submission.value.education,
      experience: submission.value.experience,
      userId: user.id,
    },
  });

  return redirect('/dashboard');
}
