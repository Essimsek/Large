import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { GET_USER_BY_USERNAME_QUERY, GET_USER_POSTS_QUERY } from '@/sanity/lib/queries';
import { Author, Post } from '@/sanity.types';
import ProfileCard from '@/components/ProfileCard';
import {auth} from '@/auth';
import PostCard from '@/components/PostCard';

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

  const posts = await client.fetch(GET_USER_POSTS_QUERY, {username}) as Post[];
  const isOwner = session?.user?.username === user.username;
  return (
    <>
      <ProfileCard user={user} isOwner={isOwner} />
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <p className="text-black text-3xl font-semibold"> 
          {isOwner ? `Your Posts` : "Posts by " + user.username}
        </p>
        <ul className="grid-card-area">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post?._id} post={post} />
            ))
          ) : (
            <li className="col-span-3 text-center text-gray-500">No posts found</li>
          )}
          </ul>
        </section>
    </>
  );
}
