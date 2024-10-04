import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return <div>{session ? 'user' : 'no user'}</div>;
};

export default page;
