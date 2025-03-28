"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { post } from "@/lib/post";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

const TimelinePostForm = () => {
  const { handleSubmit } = useForm(); // react-hook-form
  const [message, setMessage] = useState<string>(""); // メッセージを管理
  const [isLoading, setIsLoading] = useState<boolean>(false); // 送信中の状態管理
const MAX_MESSAGE_LENGTH:number = 140;//140文字を投稿の最大入力文字数にセット

  // 投稿ボタン押下
  const onSubmit = async () => {
    if (!message.trim()) return; // 空文字の投稿を防ぐ
if(message.length > MAX_MESSAGE_LENGTH){
    return
}//140文字以上の投稿を防ぐ

    setIsLoading(true); // 送信開始
    try {
      const userId = 16; 
      const response = await post(message, userId);

      if (response.status === 201) {
        console.log("投稿成功");
        setMessage(""); // 成功したら入力をクリア
        mutate("api/post/get_today_posts")//swrでタイムライン更新
      } else {
        console.error("投稿失敗");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false); // 送信完了
    }
  };

  return (
    <div className="border-b px-6 py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <Textarea
            className="overflow-y-auto max-h-[200px]"
            placeholder="24時間だけの投稿をしよう"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // useStateで管理
          />
       
        </div>
        <div className="flex justify-end mt-1">    {message.length > MAX_MESSAGE_LENGTH && <p className="text-gray-500">{MAX_MESSAGE_LENGTH}文字以内で入力してください</p>}</div>
        <div className="flex justify-end">
           
          <Button 
            type="submit" 
            className="cursor-pointer mt-2 bg-amber-300 flex hover:scale-105"
            disabled={isLoading || !message.trim() || message.length > MAX_MESSAGE_LENGTH
            }
          >
            {isLoading ? "投稿中..." : "投稿"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimelinePostForm;
