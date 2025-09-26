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

export type EditablePost = {
  title: string;
  description: string;
  category: string;
  content: string;
  image?: string;
  _id?: string;
};

interface PostFormProps {
  post?: EditablePost;
}

function PostForm({post}: PostFormProps) {

  const parsedContent = typeof post?.content === "string" ? JSON.parse(post?.content) : post?.content;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    if (post) {
      await updatePost({data: form}, {postId: post._id});
    }
    else {
      await createNewPost({data: form})
    }
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
      <Button type='submit' className='inline-flex'>{post ? 'Update' : 'Create'}</Button>
    </form>
  )
}

export default PostForm