<<<<<<< HEAD
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return <div>{session ? 'user' : 'no user'}</div>;
};

export default page;
=======
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return <div>{session ? 'user' : 'no user'}</div>;
};

export default page;
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
