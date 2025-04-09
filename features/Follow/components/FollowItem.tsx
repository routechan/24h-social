import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

const FollowItem = ({followData}) => {
  
  return (
    <Link href={`/user/${followData?.followedId}`}>
    <div className="max-w-2xl mx-auto bg-white border-b border-violet-500 hover:bg-violet-100">
      <div className="flex space-x-4 items-center p-4 ">
       
          <Avatar>
            <AvatarImage src={'https://github.com/shadcn.png'} />
          </Avatar>
       
        <div>
          <div className="text-sm font-medium text-gray-900">{followData?.followed?.name}</div>
          <div className="text-xs text-gray-500">{followData?.followed?.profile?.bio}</div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default FollowItem