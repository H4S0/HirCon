import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = requireUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await prisma.jobAlert.findMany({
    where: {
      id: (await user).id,
    },
    select: {
      jobTitle: true,
    },
  });

  return NextResponse.json(data);
}
