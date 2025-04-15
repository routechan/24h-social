import LikeButton from '@/app/components/ui/LikeButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { PostType } from '../types/types';

type Props = {
post:PostType
}
const TimelinePost = ({post}:Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const startX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || startX.current === null) return;
    const deltaX = e.clientX - startX.current;
    setTranslateX(deltaX);
    setOpacity(1 - Math.min(Math.abs(deltaX) / 200, 1));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 120 || translateX < -120) {
      const direction = translateX > 0 ? 1 : -1;
      setIsAnimating(true);
      setTranslateX(direction * 500); // スワイプで飛ばす
      setOpacity(0);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setTranslateX(0);
        setOpacity(1);
        setIsAnimating(false);
      }, 300);
    } else {
      setTranslateX(0);
      setOpacity(1);
    }
  };
  const currentCard = data[currentIndex];
  if (!currentCard) return <div className="mt-20 text-center">カードはもうありません</div>;

  return (
    <div className="mx-auto mt-20 w-full flex justify-center touch-none">
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        transform: `translateX(${translateX}px) rotate(${translateX * 0.05}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease, opacity 0.3s ease",
        opacity,
        width: 300,
        height: 400,
        backgroundColor: "white",
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        position: "absolute",
        cursor: "grab",
        touchAction: "none", // ← スマホで必須！
      }}
    >
      <div className="flex justify-around mt-2">
      <LikeButton postId={post.id} likes={post.likes} />
        <button className="bg-violet-100 cursor-pointer p-4 rounded-2xl">うーん</button>
      </div>
      <div className="p-4 text-center">
        <div className='flex'>
      <Link href={`/user/${post.user?.id}`}>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
    </Link>
        <p className="text-lg font-bold">{currentCard.name}</p>
        <p className="mt-2">{currentCard.post}</p>
        </div>
      </div>
             {/* コメント */}
             <div className='flex gap-1 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
<span>{post.replies.length}</span>
</div>
    </div>
  </div>


    /////////////////////////////////////////////////
   
  )
}

export default TimelinePost