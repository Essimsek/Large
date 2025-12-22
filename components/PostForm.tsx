"use client"

import { Button } from './ui/button'
import { Label } from './ui/label'
import SimpleDropzone from './ui/dropzone'
import { TextareaWithCounter } from './ui/textarea'
import { InputWithCounter } from '@/components/ui/input';
import { SimpleEditor } from './tiptap-templates/simple/simple-editor'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { createNewPost } from '@/sanity/lib/create-new-post'
import { updatePost } from '@/sanity/lib/update-post'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react';

export type EditablePost = {
  title: string;
  description: string;
  category: string;
  content: string;
  image?: string;
  author: {
    username: string;
  }
  slug: string;
  _id: string;
};

interface PostFormProps {
  post?: EditablePost;
}

function PostForm({post}: PostFormProps) {

  const [clicked, setClicked] = useState(false);
  
  const parsedContent = typeof post?.content === "string" ? JSON.parse(post?.content) : post?.content;
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setClicked(true);
    const data = new FormData(e.target as HTMLFormElement)
    if (post) {
        const result = await updatePost(data, post._id);
        const success = result?.success;
        const msg = result?.message;
        if (success) {
          toast.success(msg)
          router.push(`/${post.author?.username}`);
        }
        else {
          toast.error(msg)
        }
      }
    else {
      const result = await createNewPost(data);
      const success = result?.success;
      const msg = result?.message;
      if (success) {
        toast.success(msg)
        router.push(`/${result.username}`);
      }
      else {
        toast.error(msg)
      }
    }
    setClicked(false);
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>

      <Label className='text-2xl' htmlFor='post-title'>Title</Label>
      <InputWithCounter defaultValue={post?.title} id='post-title' name='post-title' className='' maxChars={100} required/>

      <SimpleDropzone postImage={post?.image}/>

      <Label className='text-2xl' htmlFor='post-description'>Description</Label>
      <TextareaWithCounter defaultValue={post?.description} id='post-description' name='post-description' maxChars={150} required/>

      <Label className='text-2xl' htmlFor='post-category'>Category</Label>
      <TextareaWithCounter defaultValue={post?.category} id='post-category' name='post-category' maxChars={40} required/>

      <Separator className="border mt-3" />
      
      <Label className='text-2xl'>Content</Label>
      <div className='w-full flex items-center justify-center'>
        <SimpleEditor content={parsedContent} />
      </div>
      <Separator className="border mt-3" />
      <Button disabled={clicked} type='submit' className='inline-flex'>{post ? 'Update' : 'Create'}</Button>
    </form>
  )
}

export default PostForm