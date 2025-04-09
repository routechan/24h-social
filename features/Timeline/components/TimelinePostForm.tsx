"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { supabase } from "@/lib/supabase";
import { createPost } from "@/app/actions/postActions";

const TimelinePostForm = () => {
  const { handleSubmit } = useForm(); // react-hook-form
  const [message, setMessage] = useState<string>(""); // メッセージを管理
  const [isLoading, setIsLoading] = useState<boolean>(false); // 送信中の状態管理
  const MAX_MESSAGE_LENGTH: number = 140; // 140文字を投稿の最大入力文字数にセット
  const [user, setUser] = useState<any>(null); // ユーザー情報を管理

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // セッション情報を取得
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user);
  
    };

    getSession();
  }, []);
  

   // 画像選択時の処理
   const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // プレビュー用URLを作成
   
    }
   
  };
 
  // 投稿ボタン押下
  const onSubmit = async () => {
    if(!user){
      alert("ログインしてください")
      return
    }
    if (!message.trim() || message.length > MAX_MESSAGE_LENGTH) return; // 空文字・140文字以上の投稿を防ぐ
    

    setIsLoading(true); // 送信開始
    try {
      const response = await createPost(message,imageFile,user.id); // ログインユーザーのIDを使う
      

      if (response.error) {
        console.error("エラーが発生しました:", response.error);
    } else  {
      console.log("投稿成功");
      setMessage(""); // 成功したら入力をクリア
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
    <div className="bg-white rounded-lg shadow-sm  mb-4 p-4">
      <p>{user ? "ログイン中" : "ログアウト中"}</p>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src= "https://github.com/shadcn.png"/>
            </Avatar>
            <Textarea
              className="overflow-y-auto max-h-[200px]"
              placeholder="24時間だけの投稿をしよう"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // useStateで管理
            />
           
          </div>

          <input type="file" accept="image/*" onChange={handleFileChange} className="block" />
<img src={previewUrl}/>

          <div className="flex justify-end mt-1">
            {message.length > MAX_MESSAGE_LENGTH && <p className="text-gray-500">{MAX_MESSAGE_LENGTH}文字以内で入力してください</p>}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer mt-2 bg-violet-300 flex hover:scale-105"
              disabled={isLoading || !message.trim() || message.length > MAX_MESSAGE_LENGTH}
            >
              {isLoading ? "投稿中..." : "投稿"}
            </Button>
          </div>
        </form>
      
    </div>
  );
};

export default TimelinePostForm;