import Link from 'next/link'
import React from 'react'

const UserFollow = ({userId,following,followers}) => {
  return (

    <div className="mt-4 flex space-x-6 border-t border-gray-100 pt-4">
      <Link href={`/follows/${userId}`}>
    <div>
      <span className="font-bold text-gray-900">{followers?.length}</span>
      <span className="text-gray-600 ml-1">フォロー中</span>
    </div>
    </Link>

    <Link href={`/followers/${userId}`}>
    <div>
      <span className="font-bold text-gray-900">{following?.length}</span>
      <span className="text-gray-600 ml-1">フォロワー</span>
    </div>
    </Link>
  </div>

  )
}

export default UserFollow