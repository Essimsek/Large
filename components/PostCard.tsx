import React from 'react';
import Link from 'next/link';
import { Heart, Eye, CalendarDays, UserCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Post } from '@/sanity.types';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="max-w-2xl w-full bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 my-6">
    { /*Header ->  avatar date etc. */ }
      <div className="flex justify-between mb-3">
        <Link href={"/" + post.author?.username} className="flex p-1 items-center justify-center gap-2 transition-all duration-150 shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-1 border border-gray-300 rounded-sm">
            {post.author?.image ?
              <img src={post.author.image} alt={post.author.username} className="w-6 h-6 rounded-full" /> 
            : <UserCircle className="w-6 h-6 text-gray-500" />
            }
          </div>
          <div className='flex flex-col justify-center'>
            <p className="text-sm font-bold pl-0.5">{post.author?.username}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <CalendarDays size={12} />
              <span>{formatDate(post._createdAt)}</span>
            </div>
          </div>
        </Link>
        
        <Link 
          href={`?query=${post.category?.toString()}`} 
          className="px-2 py-1 bg-yellow-400 text-black max-h-7 text-xs font-bold border transition-all duration-150 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {post.category}
        </Link>
      </div>

      { /*Content Section*/ }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Link href={`/${post.author?.username}/${post.slug}`}>
            <h2 className="text-xl font-bold mb-2 hover:underline">{post.title}</h2>
          </Link>
          <p className="text-gray-700 line-clamp-3">{post.description}</p>
        </div>
        
        <div className="md:col-span-1 flex justify-center">
          <div className="border-2 border-black w-full h-32 bg-gray-100 flex items-center justify-center">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed border-gray-400 w-full h-full flex items-center justify-center">
                <span className="text-xs text-gray-500">NO IMAGE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats and Read More */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-300">
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-600">
            <Eye className="mr-1" size={16} />
            <span className="text-xs font-medium">{post.views} views</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Heart className="mr-1" size={16} fill="#f87171" stroke="#f87171" />
            <span className="text-xs font-medium">{post.likes} likes</span>
          </div>
        </div>
        
        <Link 
          href={`/${post.author?.username}/${post.slug}`} 
          className="flex items-center text-sm font-bold hover:underline group transition-all"
        >
          Read more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 transition-all group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;