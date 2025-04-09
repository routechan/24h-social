import LikeButton from '@/app/components/ui/LikeButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link';
import React from 'react'
import { PostType } from '../types/types';

type Props = {
post:PostType
}
const TimelinePost = ({post}:Props) => {
// 投稿の作成時間を Date 型に変換
const createdAt = new Date(post.createdAt);
const now = new Date();
const timeDiff = now - createdAt; // ミリ秒単位の差

// 経過時間を秒・分・時間に変換
const elapsedSeconds = Math.floor(timeDiff / 1000);
const elapsedMinutes = Math.floor(elapsedSeconds / 60);
const elapsedHours = Math.floor(elapsedMinutes / 60);

// 24時間から引いて「残り時間」を計算
let remainingHours = 24 - elapsedHours;
const remainingMinutes = 60 - (elapsedMinutes % 60);
const remainingSeconds = 60 - (elapsedSeconds % 60);



// もし `remainingHours` が 24 になったら 0 にする（バグ修正）
if (remainingHours === 24) {
  remainingHours = 23;
}
// 時間を "HH:mm:ss" 形式にフォーマット
const formattedTime = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;


  return (
    
    <div className="bg-white rounded-lg shadow-sm mb-2 p-4 hover:bg-violet-100">
<div className='flex  space-x-4'>
<Link href={`/user/${post.user?.id}`}>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
    </Link>
    <div>
    <div className='text-sm flex gap-8'>
    <Link href={`/user/${post.user?.id}`}><div>{post.user?.name}</div></Link>
        <div className='text-gray-500'>残り{formattedTime}</div>
    </div>
    <Link href={`/post/${post.id}`}>
    <div className=' mt-2 '>{post.content}</div>
    </Link>

{/* 投稿下部 */}
    <div className='flex gap-2 mt-4'>
        {/* コメント */}
        <div className='flex gap-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
<span>{post.replies.length}</span>
</div>

{/* いいね */}
<LikeButton postId={post.id} likes={post.likes} />
    </div>
</div>
</div>

    </div>
   
  )
}

export default TimelinePost