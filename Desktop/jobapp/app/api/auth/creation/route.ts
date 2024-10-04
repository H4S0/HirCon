import prisma from '@/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log('User from Kinde:', user); // Add this line

    if (!user || !user.id) {
      throw new Error('Something went wrong');
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          firstName: user.given_name ?? '',
          lastName: user.family_name ?? '',
          email: user.email ?? '',
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }
    return NextResponse.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to get user' },
      { status: 500 }
    );
  }
}
