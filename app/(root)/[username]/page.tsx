import React from 'react'
// import { auth } from '@/auth'
import { GET_USER_BY_USERNAME_QUERY } from '@/sanity/lib/queries'
import { Author } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Image from 'next/image';
async function Page({ params }:
    { params: Promise<{username: string}> }
) {
    const { username } = await params;
    const user = await client.fetch(GET_USER_BY_USERNAME_QUERY, {username}) as Author;
    if (!user) {
        notFound();
    }
    const userImage = user?.image || "";
    return (
        <div className="red-container pattern">
            <Image src={userImage} width={200} height={200} className='rounded-full' alt={"Profile photo"} />
            <div className="w-full flex flex-col items-center justify-center">
                <Header title={user.name || ""} />
                <p className="font-semibold text-white text-center mt-4">
                    {user.bio || "This user has not set up their profile yet."}
                </p>
            </div>
        </div>
    )
}

export default Page
