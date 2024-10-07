import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { profileSchema } from '../utils/zodSchemas';
import prisma from '../utils/db';

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

  const response = await prisma.profile.create({
    data: {
      description: submission.value.description,
      currentStatus: submission.value.currentStatus,
      skills: submission.value.skills,
      education: submission.value.education,
      experience: submission.value.education,
      userId: user.id,
    },
  });

  return redirect('/dashboard');
}
