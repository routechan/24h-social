"use client"
import React, { useEffect, useState } from 'react'

const CardHeader = ({userId,time,likes,commentCount}) => {
    const postedAt = new Date(time);
    const now = new Date();
  
    const diffMs = now.getTime() - postedAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    let displayText = "";
  
    if (diffMinutes < 1) {
      displayText = "たった今";
    } else if (diffMinutes < 60) {
      displayText = `${diffMinutes}分前`;
    } else if (diffHours < 24) {
      displayText = `${diffHours}時間前`;
    } else {
      displayText = `${diffDays}日前`;
    }

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      if (userId) {
           setIsClicked(likes.some((like) => like.userId === userId));
     }
    }, [userId, likes]);

  return (
    <div className='flex justify-between '>
<div>{displayText}</div>
        <div className='flex gap-4'>
           <div className='flex gap-1 items-center'> 
            <span> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
      </span>
      <span>{commentCount}</span>
      </div>


      <div className='flex gap-1 items-center'> 
            <span> 
            <svg xmlns="http://www.w3.org/2000/svg" fill={isClicked ? "oklch(0.704 0.191 22.216)" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isClicked ? "none" : "currentColor"} className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

      </span>
      <span>{likes.length}</span>
      </div>
        </div>
    </div>
  )
}

export default CardHeader