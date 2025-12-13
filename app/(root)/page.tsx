import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { Suspense } from "react";
import PostList from "@/components/PostList";
import SkeletonList from "@/components/ui/SkeletonList";
import MyPagination from "@/components/Pagination";
import { client } from "@/sanity/lib/client";
import { GET_TOTAL_POSTS_COUNT } from "@/sanity/lib/queries";

export const experimental_ppr = true;
const MAX_POST_PER_PAGE = 6;

export default async function Home({ searchParams }: {
   searchParams: Promise<{query?: string, page?: number}>
}) {

  // search params
  const query = (await searchParams).query
  const page = Number((await searchParams).page) || 1;

  // start end for pagination
  const start = ((page || 1) - 1) * MAX_POST_PER_PAGE
  const end = start + MAX_POST_PER_PAGE;
  const params = { search: query ? `*${query}*` : null, start, end};
  
  // get the total posts count to give to pagination
  const totalPosts = await client.fetch(GET_TOTAL_POSTS_COUNT, {search: params.search});
  const totalPages = Math.ceil(totalPosts / MAX_POST_PER_PAGE);

  return (
    <>
      <section className="red-container pattern">
        <Header title="Think Large. Write Larger." />
        <p className="font-semibold text-white text-center mt-4 text-lg">
          Write your story, discover others', and build your own library of <span className="bg-black p-1 rounded-sm">inspiration</span>
        </p>
        <SearchForm query={query}/>
      </section>
      
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <p className="text-black text-3xl font-semibold"> 
          {query ? `Search results for ${query}` : "Explore Posts"}
        </p>
        <Suspense fallback={<SkeletonList range={4} />}>
          <PostList params={params} />
        </Suspense>
        <MyPagination pageCount={totalPages}/>
      </section>
    </>
  );
}
