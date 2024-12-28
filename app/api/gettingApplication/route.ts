import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = requireUser();

  const company = await prisma.company.findFirst({
    where: {
      ownerId: (await user).id,
    },
  });

  const jobAlert = await prisma.jobAlert.findFirst({
    where: {
      companyId: company?.id,
    },
  });

  const data = await prisma.application.findMany({
    where: {
      jobId: jobAlert?.id,
    },
    select: {
      fullName: true,
      email: true,
      coverLetter: true,
    },
  });

  return NextResponse.json(data);
}
