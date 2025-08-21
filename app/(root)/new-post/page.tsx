import { auth } from '@/auth';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';

const Page = async () => {
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
    return (
        <>
            <div className='red-container pattern'>
                <Header title='Welcome to the Create Page' />
                <p className='font-semibold text-white text-center'>Start writing your post right here.</p>
            </div>
            <section className='px-auto mt-5 lg:max-w-4xl md:max-w-3xl mx-auto sm:max-w-xl max-w-sm'>
                <PostForm />
            </section>
        </>
    );
}

export default Page;
