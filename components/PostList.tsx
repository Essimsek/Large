import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity.types";
import { GET_ALL_POSTS_QUERY_DESC } from "@/sanity/lib/queries";
import PostCard from "@/components/PostCard";

export interface QuerySearchParams {
    search: string | null;
    start: number;
    end: number; 
}

const  PostList = async ({params}: { params: QuerySearchParams }) => {
    const posts = await client.fetch(GET_ALL_POSTS_QUERY_DESC, params) as Post[];
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
