import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

const PostReply = ({reply}) => {
  return (
    <div className="mt-6 space-y-4">
               
    <div  className="pl-4 border-l-2 border-purple-100">
      <div className="flex items-start space-x-3">
      <Link href={`/user/${reply?.userId}`}>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
    </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
          <Link href={`/user/${reply?.userId}`}><div>{reply?.user?.name}</div></Link>
            
          </div>
          <p className="mt-1 text-gray-800">{reply?.content}</p>
        
        </div>
      </div>
    </div>

    
    </div>
  )
}

export default PostReply