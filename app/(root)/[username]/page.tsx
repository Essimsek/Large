import React from 'react'
import { auth } from '@/auth'

async function Page({ params }: 
    { params: Promise<{username: string}> }
) {
    const { username } = await params;
    const session = await auth();
    console.log("Username:", session);
    return (
        <div>Page for {session?.user ? session.user.name : username}</div>
    )
}

export default Page