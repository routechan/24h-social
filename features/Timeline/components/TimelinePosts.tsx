"use client";
import useSWR from "swr";
import TimelinePost from "./TimelinePost";
import { fetcher } from "@/lib/fetcher";

const TimelinePosts = () => {
  const { data, error,isLoading } = useSWR("api/post/get_today_posts", fetcher);//useSWRで24時間以内の投稿を取得

  return (
    <div>
      {error && <div>データ取得失敗</div>}
      {isLoading && <div>ローディング中</div>}
      {data && data.length > 0 ? (
        data.map((post) => (
          <TimelinePost key={post.id} post={post} /> 
        ))
      ) : (
        <div>投稿がありません。</div>
      )}
    </div>
  );
};

export default TimelinePosts;
