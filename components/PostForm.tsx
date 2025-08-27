"use client"
import { Button } from './ui/button'
import { Label } from './ui/label'
import SimpleDropzone from './ui/dropzone'
import { TextareaWithCounter } from './ui/textarea'
import { InputWithCounter } from '@/components/ui/input';
import { SimpleEditor } from './tiptap-templates/simple/simple-editor'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { createNewPost } from '@/sanity/lib/create-new-post'

function PostForm() {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    await createNewPost({data: form})
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>

      <Label className='text-2xl' htmlFor='post-title'>Title</Label>
      <InputWithCounter id='post-title' name='post-title' className='' maxChars={100} required/>

      <SimpleDropzone />

      <Label className='text-2xl' htmlFor='post-description'>Description</Label>
      <TextareaWithCounter id='post-description' name='post-description' maxChars={150} required/>
      
      <Separator className="border mt-3" />
      
      <Label className='text-2xl'>Pitch information</Label>
      <div className='w-full flex items-center justify-center'>
        <SimpleEditor />
      </div>
      <Separator className="border mt-3" />
      <Button type='submit' className='inline-flex'>Submit</Button>
    </form>
  )
}

export default PostForm