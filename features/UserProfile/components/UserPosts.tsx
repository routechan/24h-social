import React from 'react'
import UserPost from './UserPost'

const UserPosts = ({userPosts,userName}) => {
 
  return (
    <div className="mt-6 border-t border-gray-100 p-2 pb-20 ">

    {userPosts ? userPosts?.map((post)=>(
 <UserPost key={post.id} post={post}  userName={userName}/>
    )
    ):<p className='text-gray-500'>投稿はありません</p>
    }
  </div>
  )
}

export default UserPosts