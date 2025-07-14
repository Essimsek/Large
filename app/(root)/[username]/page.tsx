import React from 'react'
// import { auth } from '@/auth'
import { GET_USER_BY_USERNAME_QUERY } from '@/sanity/lib/queries'
import { Author } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

async function Page({ params }: 
    { params: Promise<{username: string}> }
) {
    const { username } = await params;
    const user = await client.fetch(GET_USER_BY_USERNAME_QUERY, {username}) as Author;
    if (!user) {
        notFound();
    }
    return (
        <>
            <h1>User Profile Page {username}</h1>
        </>
    )
}

export default Page