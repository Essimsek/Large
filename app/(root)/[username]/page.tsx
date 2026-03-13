import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { GET_USER_BY_USERNAME_QUERY, GET_TOTAL_POSTS_COUNT, GET_USER_DRAFTS } from '@/sanity/lib/queries';
import { Author, Post } from '@/sanity.types';
import type { Metadata } from 'next';
import ProfileCard from '@/components/ProfileCard';
import PostCard from '@/components/PostCard';
import {auth} from '@/auth';
import { urlForImage } from '@/sanity/lib/image';

// pagination
import MyPagination from '@/components/Pagination';
import { Suspense } from 'react';
import SkeletonList from '@/components/ui/SkeletonList';
import PostList from '@/components/PostList';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ username: string }>;
}): Promise<Metadata> {
    const { username } = await params;
    const user = await client.fetch(GET_USER_BY_USERNAME_QUERY, { username }) as Author;
    if (!user) return { title: "User Not Found" };
    return {
        title: user.name || user.username,
        description: user.bio || `Posts by ${user.username}`,
        openGraph: {
            type: "profile",
            ...(user.image && {
                images: [urlForImage(user.image).width(400).height(400).url()],
            }),
        },
    };
}

const MAX_POST_PER_PAGE = 6;
export const experimental_ppr = true;

type PageProps = {
  params: Promise<{ username: string }>
  searchParams: Promise<{ page?: string; tab?: string }>
};

export default async function Page({ params, searchParams }: PageProps) {
  const { username } = await params;
  const session = await auth();
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const tab = sp.tab;

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

  if (page > totalPages && totalPages > 0 || page < 0) {
    redirect(`/${username}?page=1`);
  }

  const search = { search: username ? `*${user._id}*` : null, start, end};
  const isOwner = session?.user?.username === user.username;
  const showDrafts = isOwner && tab === "drafts";

  const skeletonRange = totalPosts - start < MAX_POST_PER_PAGE ? totalPosts - start : MAX_POST_PER_PAGE;

  let drafts: Post[] = [];
  if (showDrafts) {
    drafts = await client.fetch(GET_USER_DRAFTS, { username }) as Post[];
  }

  return (
    <>
      <ProfileCard user={user} isOwner={isOwner} />
      <section className="px-6 py-10 mx-auto max-w-7xl">
        {isOwner && (
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            <Link
              href={`/${username}`}
              className={`pb-2 text-sm font-semibold transition-colors ${
                !showDrafts
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Published
            </Link>
            <Link
              href={`/${username}?tab=drafts`}
              className={`pb-2 text-sm font-semibold transition-colors ${
                showDrafts
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Drafts
            </Link>
          </div>
        )}

        {!isOwner && (
          <p className="text-black text-3xl font-semibold">
            Posts by {user.username}
          </p>
        )}

        {showDrafts ? (
          <ul className="grid-card-area">
            {drafts.length > 0 ? (
              drafts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <li className="col-span-3 text-center text-gray-500">No drafts</li>
            )}
          </ul>
        ) : (
          <>
            <Suspense fallback={<SkeletonList range={skeletonRange} />}>
              <PostList params={search} />
            </Suspense>
            <MyPagination pageCount={totalPages} />
          </>
        )}
      </section>
    </>
  );
}
