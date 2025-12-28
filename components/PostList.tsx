import { client } from "@/sanity/lib/client";
import type { Post } from "@/sanity.types";
import { GET_ALL_POSTS_QUERY_DESC } from "@/sanity/lib/queries";
import PostCard from "@/components/PostCard";

export type QuerySearchParams = {
    search: string | null;
    start: number;
    end: number; 
}

type PostListProps = {
    params: QuerySearchParams;
}

const  PostList = async ({params}: PostListProps ) => {
    const posts: Post[] = await client.fetch(GET_ALL_POSTS_QUERY_DESC, params);
    return (
          <ul className="grid-card-area">
            {posts?.length > 0 ? (
              posts.map((post: Post) => (
                <PostCard key={post?._id} post={post} />
              ))
            ):
            <li className="col-span-3 text-center text-gray-500">No results found</li>
          }
          </ul>
    );
}

export default PostList;
