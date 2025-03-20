"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { post } from "@/lib/post";

const TimelinePostForm = () => {
  const [message, setMessage] = useState(""); // メッセージを管理
  const [isLoading, setIsLoading] = useState(false); // 送信中の状態管理

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return; // 空文字の投稿を防ぐ

    setIsLoading(true); // 送信開始
    try {
      const userId = 16; 
      const response = await post(message, userId);

      if (response.status === 201) {
        console.log("投稿成功");
        setMessage(""); // 成功したら入力をクリア
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
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <Textarea
            placeholder="24時間だけの投稿をしよう"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="mt-2 bg-amber-300 flex"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? "投稿中..." : "投稿"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimelinePostForm;
