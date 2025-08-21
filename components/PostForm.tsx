import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function PostForm() {
  return (
    <form className='flex flex-col gap-4 p-5'>
      <Input className='' type="text" placeholder="Title" />
      <Input type="file" accept="image/*" />
      <Button className='w-full' type="submit">Publish</Button>
    </form>
  )
}

export default PostForm