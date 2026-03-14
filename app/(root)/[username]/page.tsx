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

    let ogImage: string | undefined;
    try {
        if (user.image) {
            ogImage = urlForImage(user.image).width(400).height(400).url();
        }
    } catch {
        // image URL build failed, skip OG image
    }

    return {
        title: user.name || user.username,
        description: user.bio || `Posts by ${user.username}`,
        openGraph: {
            type: "profile",
            ...(ogImage && { images: [ogImage] }),
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
      <section className="px-6 py-12 mx-auto max-w-7xl">
        {isOwner && (
          <div className="flex gap-1 mb-8 bg-muted/50 dark:bg-muted/30 p-1 rounded-xl w-fit">
            <Link
              href={`/${username}`}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                !showDrafts
                  ? "bg-background dark:bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Published
            </Link>
            <Link
              href={`/${username}?tab=drafts`}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                showDrafts
                  ? "bg-background dark:bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Drafts
            </Link>
          </div>
        )}

        {!isOwner && (
          <>
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              Posts by {user.username}
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mt-2 mb-4" />
          </>
        )}

        {showDrafts ? (
          <ul className="grid-card-area">
            {drafts.length > 0 ? (
              drafts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <li className="col-span-3 text-center text-muted-foreground py-12">No drafts yet</li>
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
