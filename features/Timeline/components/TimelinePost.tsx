import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const TimelinePost = () => {
  return (
    <div className='w-full border-b px-6 py-4'>
<div className='flex items-center space-x-4'>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
    <div>
    <div className='text-sm flex gap-1'>りくるーと<span className='text-gray-500'>@Af6dj83p</span></div>
</div>
</div>
<div className=' mt-2'>はじめまして～。<br/>りくるーとっていいます。よろしくね～</div>
    </div>
  )
}

export default TimelinePost