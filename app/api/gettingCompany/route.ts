import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = await requireUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await prisma.company.findMany({
    where: {
      ownerId: user.id,
    },
    select: {
      companyName: true,
      industry: true,
      location: true,
      companySize: true,
      companyDescription: true,
      website: true,
    },
  });

  return NextResponse.json(data);
}
