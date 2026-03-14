import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { Suspense } from "react";
import PostList from "@/components/PostList";
import SkeletonList from "@/components/ui/SkeletonList";
import MyPagination from "@/components/Pagination";
import { client } from "@/sanity/lib/client";
import { GET_TOTAL_POSTS_COUNT } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";
import type { QuerySearchParams } from "@/components/PostList";
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

  return (
    <>
      <section className="red-container pattern">
        <Header title="Think Large. Write Larger." />
        <p className="font-medium text-white/90 text-center mt-5 text-lg max-w-xl leading-relaxed">
          Write your story, discover others&apos;, and build your own library of <span className="bg-black/80 px-2 py-0.5 rounded-lg font-semibold">inspiration</span>
        </p>
        <SearchForm query={query}/>
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
