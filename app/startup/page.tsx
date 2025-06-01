import React from 'react';
import { auth } from '@/auth';

const Page = async () => {
    const session = await auth();
    if (!session || !session?.user) {
        return (
            <div className='red-container pattern'>
                <h1>Please sign in to access the startup page.</h1>
            </div>
        );
    }
    return (
        <div className='red-container pattern'>
            <h1>Startup Page</h1>
        </div>
    );
}

export default Page;
