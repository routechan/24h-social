import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const TimelinePost = ({post}) => {
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
let remainingMinutes = 60 - (elapsedMinutes % 60);
let remainingSeconds = 60 - (elapsedSeconds % 60);



// もし `remainingHours` が 24 になったら 0 にする（バグ修正）
if (remainingHours === 24) {
  remainingHours = 23;
}
// 時間を "HH:mm:ss" 形式にフォーマット
const formattedTime = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;


  return (
    <div className="bg-white rounded-lg shadow-sm mb-2 p-4">
<div className='flex  space-x-4'>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
    <div>
    <div className='text-sm flex gap-8'>
        <div>{post.user.name}</div>
        <div className='text-gray-500'>残り{formattedTime}</div>
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
<div className='flex gap-1 cursor-pointer'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
<span>3</span>
</div>
    </div>
</div>
</div>

    </div>
  )
}

export default TimelinePost