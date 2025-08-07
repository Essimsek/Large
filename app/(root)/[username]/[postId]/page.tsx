import { GET_POST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { Post } from '@/sanity.types';
import React from 'react';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/PortableTextComponents';

const Page = async ({params}: {
    params: Promise<{username: string, postId: string}>
}) => {
    const {username, postId} = await params;
    const currentPost = await client.fetch(GET_POST_BY_SLUG_QUERY, {username, slug: postId}) as Post;
    
    if (!currentPost) {
        notFound();
    }

    const { title, description, author, category, image, likes, views, _createdAt, _updatedAt, pitch } = currentPost;
    return (
        <>
            {/* Header Section */}
            <section className='red-container pattern'>
                <div className="max-w-4xl w-full mx-auto relative">
                    <div className="flex flex-col items-center">
                        <Header title={title || ''} />
                        
                        {category && (
                            <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium mt-4">
                                {category}
                            </span>
                        )}
                        
                        <p className="text-xl text-white text-center mt-4 max-w-3xl">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-5 mt-6 mb-6">
                <div className="flex items-center gap-4">
                    <Link 
                    href={`/${author?.username}`} 
                    className="flex items-center gap-3 group flex-1"
                    >
                    <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden shadow-md">
                        {author?.image ? (
                        <Image
                            src={author.image}
                            alt={`${author.name}'s avatar`}
                            fill
                            className="object-cover rounded-full border-2 border-white group-hover:border-red-300 transition-all"
                        />
                        ) : (
                        <div className="bg-gray-300 border-2 border-dashed rounded-full w-full h-full" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 group-hover:text-red-600 group-hover:underline">
                        {author?.name}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-700">
                        @{author?.username}
                        </p>
                    </div>
                    </Link>
                    
                    <div className="h-8 w-px bg-gray-300"></div>
                    
                    <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Published</span>
                    <time className="font-medium text-gray-700" dateTime={_createdAt}>
                        {formatDate(_createdAt)}
                    </time>
                    </div>
                    
                    <div className="flex flex-col ml-4">
                    <span className="text-xs text-gray-500">Updated</span>
                    <time className="font-medium text-gray-700" dateTime={_updatedAt}>
                        {formatDate(_updatedAt)}
                    </time>
                    </div>
                </div>
            </section>

            {/* Thumbnail image */}
            {image && (
                <section className="max-w-4xl mx-auto px-5 mt-8">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={image}
                            alt={title || 'Post image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>
            )}

            <section className="max-w-3xl mx-auto px-5 py-10">
                {pitch && pitch.length > 0 ? (
                    <PortableText 
                        value={pitch} 
                        components={components}
                    />
                ) : (
                    <p className="text-gray-500 italic">No content available</p>
                )}
                
                <div className="mt-12 pt-6 border-t border-gray-200 text-gray-500 text-sm flex justify-between">
                    <p>Last updated: {formatDate(_updatedAt)}</p>
                    <p>{views?.toLocaleString()} views • {likes?.toLocaleString()} likes</p>
                </div>
            </section>
        </>
    );
}

export default Page;
