import LikeButton from '@/app/components/ui/LikeButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const UserPost = ({post,userName}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-2 p-4">
    <div className='flex  space-x-4'>

        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      
        <div>
        <div className='text-sm flex gap-8'>
            <div>{userName}</div>
            <div className='text-gray-500'>残り</div>
        </div>
        <div className=' mt-2 '>{post.content}</div>
    
    {/* 投稿下部 */}
        <div className='flex gap-2 mt-4'>
            {/* コメント */}
            <div className='flex gap-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
    <span>2</span>
    </div>
    
    {/* いいね */}
   <LikeButton postId={post.id} likes={post.likes}/>
        </div>
    </div>
    </div>
    
        </div>
  )
}

export default UserPost