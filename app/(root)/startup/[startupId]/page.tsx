"use client"
import React from 'react';
import { useParams } from 'next/navigation';

interface PageProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
    const params = useParams();
    const id = params?.startupId;

    return (
        <div>
            Hello From startup {id}
        </div>
    );
}

export default Page;
