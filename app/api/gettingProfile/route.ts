import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/app/utils/db';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await prisma.profile.findMany({
    where: {
      userId: (await user).id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(data);
}