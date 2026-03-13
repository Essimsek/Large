import { GET_POST_BY_SLUG_QUERY, CHECK_USER_LIKED_POST, GET_AUTHOR_ID_BY_USERNAME_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import type { Post } from '@/sanity.types';
import React from 'react';
import { notFound } from 'next/navigation';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { urlForImage } from '@/sanity/lib/image';
import PortableEditor from '@/components/PortableEditor';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import { Edit2Icon, Settings } from 'lucide-react';

import DeletePostButton from './deletePostButton';
import PublishPostButton from './PublishPostButton';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import RelatedPosts from '@/components/RelatedPosts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const Page = async ({params}: {
    params: Promise<{username: string, postId: string}>
}) => {
    const {username, postId} = await params;
    const currentPost = await client.fetch(GET_POST_BY_SLUG_QUERY, {username, slug: postId}) as Post; // get the posts
    const session = await auth();
    const isOwner = session?.user.username === username;
    if (!currentPost) {
        notFound();
    }
    try {
        if (!isOwner) {
            await client.patch(currentPost._id)
            .inc({ views: 1 })
            .commit();
        }
    } catch (error) {
        console.error("Error updating post views:", error);
    }
    const isDraft = (currentPost as Post & { status?: string }).status === "draft";
    if (isDraft && !isOwner) {
        notFound();
    }
    const { title, description, author, category, image, likes, views, _createdAt, _updatedAt, content } = currentPost;
    const readingTime = content ? estimateReadingTime(content) : 1;
    const isAuthenticated = !!session?.user?.username;

    let userLiked = false;
    if (isAuthenticated) {
        const currentAuthor = await client.fetch(GET_AUTHOR_ID_BY_USERNAME_QUERY, { username: session!.user.username });
        if (currentAuthor?._id) {
            userLiked = await client.fetch(CHECK_USER_LIKED_POST, { authorId: currentAuthor._id, postId: currentPost._id });
        }
    }
    return (
        <>
            {/* Post Header Section (category, description, title and settings dropdown menu) */}
            <section className='red-container pattern relative'>
                <div className="max-w-4xl w-full mx-auto relative">
                    <div className="flex flex-col items-center">
                        <Header title={title || ''} />
                        
                        <div className="flex items-center gap-2 mt-4">
                            {isDraft && (
                                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                                    DRAFT
                                </span>
                            )}
                            {category && (
                                <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {category}
                                </span>
                            )}
                        </div>
                        
                        <p className="text-xl text-white text-center mt-4 max-w-3xl">
                            {description}
                        </p>
                    </div>
                </div>
                {isOwner && 
                <div className='absolute bottom-0.5 right-0.5 p-10'>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Settings/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-none mr-4 bg-black/80 text-white font-medium">
                        <DropdownMenuItem asChild>
                            <Link className='w-full flex justify-between !px-3 !py-2' href={`/${username}/${postId}/edit`}>
                                Edit
                                <Edit2Icon />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <PublishPostButton postId={currentPost._id} isPublished={!isDraft} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className='focus:bg-red-400'>
                            <DeletePostButton postId={currentPost._id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                }
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
                            src={urlForImage(author.image).width(48).height(48).url()}
                            alt={`${author.name}'s avatar`}
                            fill
                            sizes='(50px) 50px, (100px) 100px, 150px'
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

                    <div className="h-8 w-px bg-gray-300 ml-4"></div>

                    <div className="flex flex-col ml-4">
                    <span className="text-xs text-gray-500">Read time</span>
                    <span className="font-medium text-gray-700">{readingTime} min</span>
                    </div>
                </div>
                <Separator className='mt-4'/>
            </section>

            {/* Thumbnail image */}
            {image && (
                <section className="max-w-4xl mx-auto px-5 mt-8">
                    <div className="relative rounded-2xl shadow-lg">
                        <Image
                            src={urlForImage(image).width(800).url()}
                            alt={title || 'Post image'}
                            height={900}
                            width={1600}
                            sizes="(100vw)"
                            className="object-cover rounded-2xl"
                        />
                    </div>
                    <Separator className='mt-4'/>
                </section>
            )}

            <section className="max-w-3xl mx-auto px-5 py-10">
                {content && content.length > 0 ? (
                    <PortableEditor content={content}
                    />
                ) : (
                    <p className="text-gray-500 italic">No content available</p>
                )}
                
                <div className="mt-12 pt-6 border-t border-gray-200 text-gray-500 text-sm flex justify-between items-center">
                    <p>Last updated: {formatDate(_updatedAt)}</p>
                    <div className="flex items-center gap-4">
                        <span>{views?.toLocaleString()} views</span>
                        <LikeButton
                            postId={currentPost._id}
                            initialLiked={userLiked}
                            initialCount={likes ?? 0}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>
                </div>

                <CommentSection
                    postId={currentPost._id}
                    currentUsername={session?.user?.username}
                />

                {category && (
                    <RelatedPosts
                        category={category}
                        postId={currentPost._id}
                    />
                )}
            </section>
        </>
    );
}

export default Page;
