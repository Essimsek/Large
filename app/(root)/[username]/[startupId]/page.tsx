"use client"
import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
    const params = useParams();
    const id = params?.startupId;

    return (
        <div>
            Hello From startup {id}
        </div>
    );
}

export default Page;
