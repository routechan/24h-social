"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { supabase } from "@/lib/supabase";
import { createPost } from "@/app/actions/postActions";



const TimelinePostForm = ({isWriting, onClose }) => {
  const { handleSubmit } = useForm(); // react-hook-form
  const [message, setMessage] = useState<string>(""); // メッセージを管理
  const [isLoading, setIsLoading] = useState<boolean>(false); // 送信中の状態管理
  const MAX_MESSAGE_LENGTH: number = 100; // 140文字を投稿の最大入力文字数にセット
  const [user, setUser] = useState<any>(null); // ユーザー情報を管理

 

  // セッション情報を取得
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user);
  
    };

    getSession();
  }, []);
  

   
  // 投稿ボタン押下
  const onSubmit = async () => {
    if(!user){
      alert("ログインしてください")
      return
    }
    if (!message.trim() || message.length > MAX_MESSAGE_LENGTH) return; // 空文字・140文字以上の投稿を防ぐ
    

    setIsLoading(true); // 送信開始
    try {
      const response = await createPost(message,user.id); // ログインユーザーのIDを使う
      

      if (response.error) {
        console.error("エラーが発生しました:", response.error);
    } else  {
      console.log("投稿成功");
      setMessage(""); // 成功したら入力をクリア
      onClose();
      mutate("api/post/get_today_posts"); // swrでタイムライン更新
    } 
    } 
    catch(err){
      console.log(err)
    }
    finally {
      setIsLoading(false); // 送信完了
    }
  };

  return (
    <>
    {isWriting && (
        <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じない
      >
        <h2 className="text-lg font-semibold mb-4">新しい投稿</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar_url || ""} />
            </Avatar>
            <span className="font-medium">{user?.name || "User"}</span>
          </div>
          <Textarea
           onChange={(e) => setMessage(e.target.value)}
            placeholder="いまなにしてる？"
            className="resize-none min-h-[100px]"
          />
          
        
            <div className="flex justify-end mt-1">
            {message.length > MAX_MESSAGE_LENGTH && <p className="text-gray-500">{MAX_MESSAGE_LENGTH}文字以内で入力してください</p>}
          </div>
          <div className="flex justify-end">
            <Button disabled={isLoading || !message.trim() || message.length > MAX_MESSAGE_LENGTH} type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
            {isLoading ? "投稿中..." : "投稿"}
            </Button>
          </div>
        </form>
        {/* 閉じるボタン（任意） */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
    )
  }
    </>
  );
};

export default TimelinePostForm;
