import { GET_POST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { Post } from '@/sanity.types';

const Page = async ({params}: {
    params: Promise<{username: string, postId: string}>
}) => {
    const {username, postId} = await params;
    const currentPost = await client.fetch(GET_POST_BY_SLUG_QUERY, {username, slug: postId}
    ) as Post;

    const {title, description, category, image, likes, views, _createdAt, _updatedAt, pitch} = currentPost
    return (
        <>
            <div>
                Hello From startup {title}
                <p>{description}</p>
                <p>Category: {category}</p>
            </div>
        </>
    );
}

export default Page;
