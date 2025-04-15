"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useRef, useState } from "react";
import { addLike } from "@/app/actions/likeActions";
import { supabase } from "@/lib/supabase";
import Card from "./Card";
import LikeButton from "@/app/components/ui/LikeButton";
import SkipButton from "@/app/components/ui/SkipButton";
import CommentButton from "@/app/components/ui/CommentButton";

const TimelinePosts = () => {
  const { data, error, isLoading } = useSWR("api/post/get_today_posts", fetcher);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCard, setShowCard] = useState(true); // カードの表示制御
  const startX = useRef<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showComments,setShowComments] = useState(false) //コメント欄の開閉

  // セッション取得
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.id) {
        setUserId(data.session.user.id);
      }
    };
    getSession();
  }, []);

  

  // ドラッグ開始
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    startX.current = e.clientX;
    setIsDragging(true);
  };

  // ドラッグ中の移動
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || startX.current === null) return;
    const deltaX = e.clientX - startX.current;
   
    setTranslateX(deltaX);
  };

  // 指を離したときの処理
  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // スワイプの方向によってカードを飛ばす向きを決める
    if (translateX > 120 || translateX < -120) {
      setShowComments(false)
      const direction = translateX > 0 ? 1 : -1;
      setIsAnimating(true);
      setTranslateX(direction * 500); 

      setTimeout(() => {
        setShowCard(false); // カード非表示（DOMから削除）
      }, 290);

      setTimeout(() => {
        if (translateX > 120) {
          addLike(userId, currentCard.id); // いいね処理
        }
        setCurrentIndex((prev) => prev + 1); // 次のカードへ
        setTranslateX(0);
        setIsAnimating(false);
        setShowCard(true); // 次のカード表示
      }, 300);

    } else {
      setTranslateX(0); // 短いスワイプは戻す
    }
    
  };

  // ♡ボタン押下時
  const onClickLike = () =>{
    setShowComments(false)
setTranslateX(500);
setTimeout(() => {
  setShowCard(false); // カード非表示（DOMから削除）
}, 290);

setTimeout(() => {
    addLike(userId, currentCard.id); // いいね処理
  setCurrentIndex((prev) => prev + 1); // 次のカードへ
  setTranslateX(0);
  setIsAnimating(false);
  setShowCard(true); // 次のカード表示
}, 300);
  }

    // skipボタン押下時
    const onClickSkip = () =>{
      setShowComments(false)
      setTranslateX(-500);
      setTimeout(() => {
        setShowCard(false); // カード非表示（DOMから削除）
      }, 290);
      
      setTimeout(() => {
          addLike(userId, currentCard.id); // いいね処理
        setCurrentIndex((prev) => prev + 1); // 次のカードへ
        setTranslateX(0);
        setIsAnimating(false);
        setShowCard(true); // 次のカード表示
      }, 300);
        }

        const onClickComment = ()=>{
setShowComments(!showComments)
        }
  

  if (isLoading || !data) {
    return <div className="mt-20 text-center">読み込み中...</div>;
  }

  const currentCard = data[currentIndex];
  if (!currentCard) return <div className="mt-20 text-center">カードはもうありません</div>;

  return (
    <div className="mx-auto mt-2 w-full flex justify-center touch-none px-2">
      <div className="relative w-full max-h-full h-[85vh] md:h-[78vh]">
        
        {/* 次のカード（ちら見せ） */}
        {data[currentIndex + 1] && (
          <div className="absolute top-0 left-0 w-full h-full  z-0 transition-transform duration-300 ">
            <Card userId={userId} nextCard={true} card={data[currentIndex + 1]} disabled />
          </div>
        )}

        {/* 現在のカード */}
        {showCard && (
  <div
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onTouchEnd={handlePointerUp}
    onMouseLeave={handlePointerUp}
    style={{
      transform: `translateX(${translateX}px) rotate(${translateX * 0.05}deg) scale(1)`,
      transition: isDragging ? "none" : "transform 0.3s ease",
    }}
    className={`absolute top-0 left-0 w-full h-full z-10  `}
  >
    {/* 赤いオーバーレイ＋テキスト（右スワイプ） */}
    <div
      className="absolute top-0 left-0 h-full w-full flex items-center justify-start px-6 pointer-events-none rounded-2xl"
      style={{
        backgroundColor: translateX > 0 ? `rgba(255, 0, 0, ${Math.min(translateX / 200, 0.6)})` : "transparent",
        opacity: translateX > 0 ? 1 : 0,
        transition: "background-color 0.2s",
      }}
    >
      <span
        className="text-white text-2xl font-bold select-none"
        style={{
          opacity: Math.min(translateX / 100, 1),
          transform: "translateX(-10px)",
        }}
      >
        いいね ❤️
      </span>
    </div>

    {/* 青いオーバーレイ＋テキスト（左スワイプ） */}
    <div
      className="absolute top-0 left-0 h-full w-full flex items-center justify-end px-6 pointer-events-none rounded-2xl"
      style={{
        backgroundColor: translateX < 0 ? `rgba(0, 0, 255, ${Math.min(-translateX / 200, 0.6)})` : "transparent",
        opacity: translateX < 0 ? 1 : 0,
        transition: "background-color 0.2s",
      }}
    >
      <span
        className="text-white text-2xl font-bold select-none"
        style={{
          opacity: Math.min(-translateX / 100, 1),
          transform: "translateX(10px)",
        }}
      >
        つぎいこ💭
      </span>
    </div>

    <Card userId={userId} nextCard={false} card={currentCard} showComments={showComments} setShowComments={setShowComments} />
  
  </div>
)}
  <LikeButton translateX={translateX} onClickLike={onClickLike}/>
  <CommentButton translateX={translateX} onClickComment={onClickComment}/>
  <SkipButton translateX={translateX} onClickSkip={onClickSkip}/>
      </div>
    </div>
  );
};

export default TimelinePosts;
