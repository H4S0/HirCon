import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = requireUser();

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

  console.log('datatata', data);

  return NextResponse.json(data);
}
