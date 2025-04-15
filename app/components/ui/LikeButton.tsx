"use client"
// import { addLike, deleteLike } from "@/app/actions/likeActions";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"
import { mutate } from "swr";

const LikeButton = ({ onClickLike,translateX }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);


  // // セッション情報を取得
  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     if (data?.session?.user?.id) {
  //       setUserId(data.session.user.id);
  //     }
  //   };

  //   getSession();
  // }, []);

  //   // ユーザーがすでにいいねしているかどうかをチェック
  //   useEffect(() => {
  //       if (userId) {
  //         setIsClicked(likes.some((like) => like.userId === userId));
  //       }
  //     }, [userId, likes]);



  // // いいねボタン押下時
  // const handleClick = async () => {
  //   if (!userId) {
  //     window.alert("ログインしてください");
  //     return;
  //   }

  //   // すでにいいねしている場合、いいねを削除
  //   if (isClicked) {
  //     const response = await deleteLike(userId, postId);
  //     if (response.error) {
  //       console.log(response.error);
  //     } else {
  //       mutate("api/post/get_today_posts")
  //       mutate(`/api/profile/${postId}`)
  //     }
  //   }
  //   // まだいいねしていない場合、いいねを追加
  //   else {
  //     const response = await addLike(userId, postId);
  //     if (response.error) {
  //       console.log("いいね失敗");
  //     } else {
  //       mutate("api/post/get_today_posts")
  //       mutate(`/api/profile/${postId}`)
  //     }
  //   }
  // };

 

  return (
    <button onClick={onClickLike} className={`flex gap-1 cursor-pointer  shadow-md rounded-full w-18 h-18 absolute -bottom-6 right-8  justify-center items-center z-40 duration-200 hover:scale-105 active:bg-red-100
   ${translateX == 0 && "bg-white/80"}
      ${translateX >= 1 && "scale-120 bg-gradient-to-br from-pink-400 to-red-400"}
      ${translateX <= -1 && "scale-90 opacity-30"}
    `}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={`${translateX >= 1 ? "white" : "oklch(0.704 0.191 22.216)"}`}
        viewBox="0 0 24 24"
        className="size-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
