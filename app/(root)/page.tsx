import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { Suspense } from "react";
import PostList from "@/components/PostList";
import SkeletonList from "@/components/ui/SkeletonList";
import MyPagination from "@/components/Pagination";
import { client } from "@/sanity/lib/client";
import { GET_TOTAL_POSTS_COUNT, GET_PLATFORM_STATS } from "@/sanity/lib/queries";
import { PenLine, Users, FolderOpen } from "lucide-react";
import { redirect } from "next/navigation";
import type { QuerySearchParams } from "@/components/PostList";
import TypedText from "@/components/TypedText";
export const experimental_ppr = true;
const MAX_POST_PER_PAGE = 6;

export default async function Home({ searchParams }: {
   searchParams: Promise<{query?: string, page?: string}>
}) {

  // search params
  const { query, page } = await searchParams;
  const pageNumber = page ? Number(page) : 1;

  // start end for pagination
  const start = ((pageNumber || 1) - 1) * MAX_POST_PER_PAGE
  const end = start + MAX_POST_PER_PAGE;
  const params: QuerySearchParams = { search: query ? `*${query}*` : null, start, end};

  // get the total posts count to give to pagination
  const totalPosts: number = await client.fetch(GET_TOTAL_POSTS_COUNT, {search: params.search});
  const totalPages = Math.ceil(totalPosts / MAX_POST_PER_PAGE);

  if ((pageNumber > totalPages && totalPages > 0) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    redirect(`/?page=1${query ? `&query=${query}` : ''}`);
  }

  const skeletonRange = totalPosts - start < MAX_POST_PER_PAGE ? totalPosts - start : MAX_POST_PER_PAGE;

  const stats = await client.fetch(GET_PLATFORM_STATS);

  return (
    <>
      <section className="red-container pattern">
        <Header title="Think Large. Write Larger." />
        <p className="font-medium text-white/90 text-center mt-5 text-lg max-w-xl leading-relaxed">
          Write your story, discover others&apos;, and build your own library of <TypedText />
        </p>
        <SearchForm query={query}/>

        {/* Stats bar */}
        <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <PenLine size={14} />
            <span className="font-semibold text-white">{stats?.totalPosts ?? 0}</span> posts
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span className="font-semibold text-white">{stats?.totalAuthors ?? 0}</span> writers
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <FolderOpen size={14} />
            <span className="font-semibold text-white">{stats?.totalCategories ?? 0}</span> topics
          </div>
        </div>
      </section>

      <section className="px-6 py-12 mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">
            {query ? `Results for "${query}"` : "Explore Posts"}
          </h2>
          {totalPosts > 0 && (
            <span className="text-sm text-muted-foreground mt-1">({totalPosts})</span>
          )}
        </div>
        <div className="w-12 h-1 bg-red-400 rounded-full mb-4" />
        <Suspense fallback={<SkeletonList range={skeletonRange} />}>
          <PostList params={params} />
        </Suspense>
        <MyPagination pageCount={totalPages}/>
      </section>
    </>
  );
}
