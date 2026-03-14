import React from 'react';
import Link from 'next/link';
import { Heart, Eye, CalendarDays, UserCircle, ArrowRight, Clock } from 'lucide-react';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import type { Post } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/image';

type PostCardProps = {
  post: Post;
}

const PostCard = ({ post }: PostCardProps ) => {
  const readingTime = post.content ? estimateReadingTime(JSON.stringify(post.content)) : 1;
  return (
    <div className="group max-w-2xl w-full bg-card rounded-2xl border border-border/60 dark:border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out p-6 my-3 overflow-hidden relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent before:transition-all before:duration-300 hover:before:border-red-400/30 before:pointer-events-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <Link href={"/" + post.author?.username} className="flex items-center gap-2.5 group/author">
          <div className="p-0.5 rounded-full bg-gradient-to-br from-red-400 to-rose-500">
            <div className="rounded-full overflow-hidden bg-card p-0.5">
              {post.author?.image ?
                <img src={urlForImage(post.author.image).width(28).height(28).url()} alt={post.author.username} className="w-7 h-7 rounded-full object-cover" />
              : <UserCircle className="w-7 h-7 text-muted-foreground" />
              }
            </div>
          </div>
          <div className='flex flex-col'>
            <p className="text-sm font-semibold group-hover/author:text-red-500 transition-colors">{post.author?.username}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays size={11} />
              <span>{formatDate(post._createdAt)}</span>
            </div>
          </div>
        </Link>

        <Link
          href={`?query=${post.category?.toString()}`}
          className="px-3 py-1 bg-yellow-400/90 dark:bg-yellow-500/90 text-black text-xs font-bold rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors duration-200"
        >
          {post.category}
        </Link>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Link href={`/${post.author?.username}/${post.slug}`}>
            <h2 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-200">{post.title}</h2>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.description}</p>
        </div>

        <div className="md:col-span-1 flex justify-center">
          {post.image ?
          <div className="rounded-xl overflow-hidden w-full h-28 bg-muted">
              <img
                src={urlForImage(post.image).width(120).height(120).url()}
                alt={post.title}
                width={120}
                height={120}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
          </div>
        :
        <div className='w-full h-28'></div>
        }
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-border/50">
        <div className="flex space-x-4">
          <div className="flex items-center text-muted-foreground">
            <Eye className="mr-1.5" size={14} />
            <span className="text-xs font-medium">{post.views}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Heart className="mr-1.5 text-red-400" size={14} fill="currentColor" />
            <span className="text-xs font-medium">{post.likes}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1.5" size={13} />
            <span className="text-xs font-medium">{readingTime} min</span>
          </div>
        </div>

        <Link
          href={`/${post.author?.username}/${post.slug}`}
          className="flex items-center text-sm font-semibold text-foreground/70 hover:text-red-500 group/link transition-colors duration-200"
        >
          Read more
          <ArrowRight size={14} className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
