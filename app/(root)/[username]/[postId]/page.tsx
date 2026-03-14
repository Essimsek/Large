import { GET_POST_BY_SLUG_QUERY, CHECK_USER_LIKED_POST, GET_AUTHOR_ID_BY_USERNAME_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import type { Post } from '@/sanity.types';
import type { Metadata } from 'next';
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
import { Edit2Icon, Settings, Clock, Eye } from 'lucide-react';

import DeletePostButton from './deletePostButton';
import PublishPostButton from './PublishPostButton';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import RelatedPosts from '@/components/RelatedPosts';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ username: string; postId: string }>;
}): Promise<Metadata> {
    const { username, postId } = await params;
    const post = await client.fetch(GET_POST_BY_SLUG_QUERY, {
        username,
        slug: postId,
    }) as Post;
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            type: "article",
            title: post.title || "",
            description: post.description || "",
            ...(post.image && {
                images: [urlForImage(post.image).width(1200).height(630).url()],
            }),
            publishedTime: post._createdAt,
        },
    };
}

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
    const currentPost = await client.fetch(GET_POST_BY_SLUG_QUERY, {username, slug: postId}) as Post;
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
            {/* Post Header */}
            <section className='red-container pattern relative'>
                <div className="max-w-4xl w-full mx-auto relative">
                    <div className="flex flex-col items-center">
                        <Header title={title || ''} />

                        <div className="flex items-center gap-2 mt-5 flex-wrap justify-center">
                            {isDraft && (
                                <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                                    DRAFT
                                </span>
                            )}
                            {category && (
                                <span className="bg-white/90 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                                    {category}
                                </span>
                            )}
                        </div>

                        <p className="text-lg text-white/90 text-center mt-5 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
                {isOwner &&
                <div className='absolute bottom-4 right-4 md:bottom-6 md:right-6'>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"><Settings size={18}/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border border-border/50 mr-4 bg-popover/95 backdrop-blur-xl text-popover-foreground font-medium rounded-xl shadow-xl">
                        <DropdownMenuItem asChild>
                            <Link className='w-full flex justify-between !px-3 !py-2 rounded-lg' href={`/${username}/${postId}/edit`}>
                                Edit
                                <Edit2Icon size={14} />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <PublishPostButton postId={currentPost._id} isPublished={!isDraft} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className='focus:bg-red-500/10 focus:text-red-600 rounded-lg'>
                            <DeletePostButton postId={currentPost._id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                }
            </section>

            {/* Author Bar */}
            <section className="max-w-4xl mx-auto px-5 mt-8 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                    href={`/${author?.username}`}
                    className="flex items-center gap-3 group flex-1 min-w-[200px]"
                    >
                    <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-red-400 transition-all duration-200">
                        {author?.image ? (
                        <Image
                            src={urlForImage(author.image).width(48).height(48).url()}
                            alt={`${author.name}'s avatar`}
                            fill
                            sizes='48px'
                            className="object-cover"
                        />
                        ) : (
                        <div className="bg-muted w-full h-full" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-red-500 transition-colors">
                        {author?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                        @{author?.username}
                        </p>
                    </div>
                    </Link>

                    <div className="flex items-center gap-5 text-sm text-muted-foreground flex-wrap">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground/70">Published</span>
                            <time className="font-medium text-foreground/80" dateTime={_createdAt}>
                                {formatDate(_createdAt)}
                            </time>
                        </div>

                        <div className="h-6 w-px bg-border" />

                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground/70">Updated</span>
                            <time className="font-medium text-foreground/80" dateTime={_updatedAt}>
                                {formatDate(_updatedAt)}
                            </time>
                        </div>

                        <div className="h-6 w-px bg-border" />

                        <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span className="font-medium text-foreground/80">{readingTime} min read</span>
                        </div>
                    </div>
                </div>
                <Separator className='mt-6 bg-border/50'/>
            </section>

            {/* Thumbnail */}
            {image && (
                <section className="max-w-4xl mx-auto px-5 mt-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={urlForImage(image).width(800).url()}
                            alt={title || 'Post image'}
                            height={900}
                            width={1600}
                            sizes="(100vw)"
                            className="object-cover"
                        />
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="max-w-3xl mx-auto px-5 py-10">
                {content && content.length > 0 ? (
                    <PortableEditor content={content} />
                ) : (
                    <p className="text-muted-foreground italic">No content available</p>
                )}

                {/* Stats */}
                <div className="mt-12 pt-6 border-t border-border/50 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Last updated: {formatDate(_updatedAt)}</p>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50">
                            <Eye size={14} />
                            <span>{views?.toLocaleString()}</span>
                        </div>
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
