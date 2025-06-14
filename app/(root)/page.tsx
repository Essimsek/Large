import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import StartupCard, {startupCardType} from "@/components/StartupCard";
import { posts } from "../api/testData/posts";

export default async function Home({ searchParams }: {
   searchParams: Promise<{query?: string}>
}) {

  const query = (await searchParams).query

  return (
    <>
      <section className="red-container pattern">
        <Header title="Think Large. Write Larger." />
        <p className="font-semibold text-white text-center mt-4">
          Write your story, discover others', and build your own library of <span className="bg-black p-1 rounded-sm">inspiration</span>
        </p>
        <SearchForm query={query}/>
      </section>
      
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <p className="text-black text-3xl font-semibold"> 
          {query ? `Search results for ${query}` : "Explore Startups"}
        </p>

        <ul className="grid-card-area">
          {posts?.length > 0 ? (
            posts.map((post: startupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ):
            <li className="col-span-3 text-center text-gray-500">No results found</li>
          }
        </ul>
      </section>
    </>
  );
}
