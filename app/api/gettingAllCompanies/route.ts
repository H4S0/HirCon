import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = await prisma.company.findMany({
    select: {
      companyName: true,
      industry: true,
      location: true,
      companySize: true,
      companyDescription: true,
      website: true,
      id: true,
    },
  });

  return NextResponse.json(data);
}
