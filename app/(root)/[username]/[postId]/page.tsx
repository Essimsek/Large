import React from 'react';

const Page = async ({params}: {
    params: Promise<{username: string, postId: string}>
}) => {
    const {username, postId} = await params;
    return (
        <div>
            Hello From startup {username} {postId}
        </div>
    );
}

export default Page;
