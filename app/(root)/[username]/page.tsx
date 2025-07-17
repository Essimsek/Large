import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { GET_USER_BY_USERNAME_QUERY } from '@/sanity/lib/queries';
import { Author } from '@/sanity.types';
import ProfileCard from '@/components/ProfileCard';
import {auth} from '@/auth';

export default async function Page({ params }: {params: Promise<{username: string}>}) {
  const { username } = await params;
  const session = await auth();
  const user = (await client.fetch(
    GET_USER_BY_USERNAME_QUERY,
    { username }
  )) as Author;

  if (!user) {
    notFound();
  }

  const isOwner = session?.user?.username === user.username;

  return (
    <ProfileCard user={user} isOwner={isOwner} />
  );
}
