import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { GET_USER_BY_USERNAME_QUERY, GET_TOTAL_POSTS_COUNT, GET_ALL_POSTS_QUERY_DESC } from '@/sanity/lib/queries';
import { Author, Post } from '@/sanity.types';
import ProfileCard from '@/components/ProfileCard';
import {auth} from '@/auth';
import PostCard from '@/components/PostCard';

// pagination 
import MyPagination from '@/components/Pagination';

const MAX_POST_PER_PAGE = 6;

export default async function Page({ params, searchParams }: {
  params: Promise<{username: string}>,
  searchParams: Promise<{page?: number}>
}) {
  const { username } = await params;
  const session = await auth();
  const page = Number((await searchParams).page) || 1;
  const user = (await client.fetch(
    GET_USER_BY_USERNAME_QUERY,
    { username }
  )) as Author;

  if (!user) {
    notFound();
  }

  const start = ((page || 1) - 1) * MAX_POST_PER_PAGE
  const end = start + MAX_POST_PER_PAGE;

  const totalPosts = await client.fetch(GET_TOTAL_POSTS_COUNT, {search: username});
  const totalPages = Math.ceil(totalPosts / MAX_POST_PER_PAGE);

  const search = { search: username ? `*${user._id}*` : null, start, end};

  const posts = await client.fetch(GET_ALL_POSTS_QUERY_DESC, search) as Post[];
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
          <MyPagination pageCount={totalPages} />
        </section>
    </>
  );
}
