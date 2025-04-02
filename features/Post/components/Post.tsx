"use client";
import React, { useEffect, useState } from "react";
import MainPost from "./MainPost";
import { useParams } from "next/navigation";
import { fetchPost } from "@/lib/post";
import PostReplies from "./PostReplies";
import ReplySubmit from "./ReplySubmit";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const Post = () => {
  const params = useParams();
  const id = params?.id as string | undefined; 
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  // const [replies,setReplies] = useState([]);

  const { data: replies, error, isLoading } = useSWR(id ? `/api/reply/${id}` : null, fetcher);


  useEffect(() => {
    const getPostInfo = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPost(id);
        const postData = await data.json()
        setPostData(postData ?? null); 
      } catch (err) {
        console.error("ポスト取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    getPostInfo();
  }, [id]);




  return (
    <div className="max-w-2xl mx-auto mt-14 px-[4%] pb-20">
      <div className="bg-white rounded-lg shadow-sm mb-2 p-4">
        {loading ? <p>Loading...</p> :
        <>
        <MainPost post={postData} />
        <ReplySubmit postId={postData.id} />
        {isLoading ? <p>リプライを取得中...</p> : error ? <p>リプライの取得に失敗しました</p> : <PostReplies replies={replies} />}
        </>
        }
      </div>
    </div>
  );
};

export default Post;
