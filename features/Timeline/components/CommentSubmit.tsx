"use client";
import { addReply } from "@/app/actions/replyActions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

const CommentSubmit = ({ postId }) => {
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null); // ユーザーIDを管理
  const [isLoading, setIsLoading] = useState<boolean>(false); // 送信中の状態管理
  const MAX_MESSAGE_LENGTH: number = 140; // 140文字を投稿の最大入力文字数にセット

  // セッション情報を取得
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUserId(data.session.user.id);
      }
    };
    getSession();
  }, []);

  // メッセージ変更時
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // 送信ボタン押下時
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  
    if (!userId) {
      window.alert("ログインしてください");
      return;
    }

    if (!message.trim() || message.length > MAX_MESSAGE_LENGTH) return; // 空文字・140文字以上の投稿を防ぐ
    setIsLoading(true)
    try {
      const response = await addReply(message,postId,userId)
      if ('error' in response) {
        console.error("リプライ失敗:", response.error);
      } else {
        console.log("リプライ成功:", response);
        mutate(`api/post/get_today_posts`)
        setMessage(""); 
      }
    } catch (error) {
      console.error("エラー発生:", error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className=" border-purple-100">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <Textarea
                value={message}
                onChange={handleChange}
                placeholder="あなたのコメント"
                className="max-w-full max-h-[200px]"
              />
              <div className="flex justify-end mt-1">
            {message.length > MAX_MESSAGE_LENGTH && <p className="text-gray-500">{MAX_MESSAGE_LENGTH}文字以内で入力してください</p>}
          </div>
              <Button size="sm" disabled={isLoading || !message.trim() || message.length > MAX_MESSAGE_LENGTH} type="submit" className="bg-violet-400">
                {isLoading ? "送信中..." : "送信"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSubmit;
