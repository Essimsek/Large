"use client"
import { Button } from './ui/button'
import { Label } from './ui/label'
import SimpleDropzone from './ui/dropzone'
import { TextareaWithCounter } from './ui/textarea'
import { InputWithCounter } from '@/components/ui/input';

function PostForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    console.log("Form submitted: ", form)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>

      <Label className='text-2xl' htmlFor='post-title'>Title</Label>
      <InputWithCounter id='post-title' name='post-title' maxChars={100}/>

      <SimpleDropzone />

      <Label className='text-2xl' htmlFor='post-description'>Description</Label>
      <TextareaWithCounter id='post-description' name='post-description' maxChars={150} />

      <Button className='w-full' type="submit">Publish</Button>
    </form>
  )
}

export default PostForm