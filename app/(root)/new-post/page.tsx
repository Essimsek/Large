import { auth } from '@/auth';
import Header from '@/components/Header';

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
        <div className='red-container pattern'>
            <Header title='Welcome to the Create Page' />
            <p className='font-semibold text-white text-center'>Start writing your post right here.</p>
        </div>
    );
}

export default Page;
