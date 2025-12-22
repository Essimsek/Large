import { client } from '@/sanity/lib/client';
import { GET_POST_FOR_EDIT_QUERY } from '@/sanity/lib/queries';
import { auth } from '@/auth';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import type { EditablePost } from '@/components/PostForm';

async function Page({params}: {
    params: Promise<{username: string, postId: string}>
}) {
  const {username, postId} = await params;
  const post: EditablePost = await client.withConfig({ useCdn: false }).fetch(GET_POST_FOR_EDIT_QUERY, { username, slug: postId });
  
    const session = await auth();
    if (!session || !session?.user) {
        return (
            <div className='red-container pattern'>
                <Header title='Please Sign In to Continue' />
                <p className='font-semibold text-white text-center'>
                    You need to be signed in to access this page. Please sign in to continue.
                </p>
            </div>
        );
    }
    if (session.user.username !== username) {
              return (
            <div className='red-container pattern'>
                <Header title='Are you sure is this your post ?' />
                <p className='font-semibold text-white text-center'>
                    You don't have the right to edit this post.
                </p>
            </div>
        );
    }
        if (!post) {
              return (
            <div className='red-container pattern'>
                <Header title='No post found!' />
                <p className='font-semibold text-white text-center'>
                    it seems that the post you are looking for does not exist or has been deleted.
                </p>
            </div>
        );
    }
    return (
        <>
            <div className='red-container pattern'>
                <Header title='Edit your post here' />
                <p className='font-semibold text-white text-center'>Edit your post below</p>
            </div>
            <section className='px-auto mt-5 lg:max-w-4xl md:max-w-3xl mx-auto sm:max-w-xl max-w-sm'>
                <PostForm post={post} />
            </section>
        </>
    );
}

export default Page