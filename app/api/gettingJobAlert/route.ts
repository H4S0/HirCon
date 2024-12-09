import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.jobAlert.findMany({
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
