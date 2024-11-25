import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = requireUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await prisma.jobAlert.findMany({
    where: {
      companyId: (await user).id,
    },
    select: {
      jobTitle: true,
      jobDescription: true,
      salary: true,
      jobType: true,
      remote: true,
      level: true,
      location: true,
      id: true,
    },
  });

  return NextResponse.json(data);
}
