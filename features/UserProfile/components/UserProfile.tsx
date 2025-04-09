"use client"
import UserPosts from './UserPosts'
import UserFollow from './UserFollow'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import FollowButton from '@/app/components/ui/FollowButton'

const UserProfile = () => {
    const params = useParams();
    const id = params?.id as string;//表示しているぷろふぃーるのユーザーのid
    const [user, setUser] = useState<any>(null); // ユーザー情報を管理
    const { data, error,isLoading } = useSWR(`/api/profile/${id}`, fetcher);//ユーザーのプロフィールを表示するためのデータを取得

    

      // セッション情報を取得
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user);
    })();

  }, []);

  
    if (isLoading) return <p className='pt-20 px-4'>Loading...</p>;
    if (error) return <p className='pt-20 px-4'>エラーが発生しました</p>;
    if (!data) return <p className='pt-20 px-4'>ユーザーが見つかりませんでした</p>;
  return (
    <div className="max-w-2xl mx-auto bg-white">
    <div className="relative h-42 bg-gradient-to-r from-purple-400 to-purple-600">
      <div className="absolute -bottom-16 left-4 w-32 h-32">
        <img
        alt="プロフィール画像" 
        src={data?.profile?.avatarUrl}
          className="w-full h-full rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>
    </div>
    
    <div className="pt-20 px-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{data?.name}
          </h2>
         
        </div>
        {id == user?.id ? 
        <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-medium hover:bg-purple-100 transition-colors duration-200">
        編集
    </button>:
    <FollowButton followingId={user?.id} followedId={id} follower={data?.following} user={user}/>
      }
        
      </div>

      <p className="mt-4 text-gray-800 whitespace-pre-line">{data?.profile?.bio}</p>

      <div className="mt-4 flex items-center space-x-2 text-gray-600">
        <span className="text-sm">2025年3月に参加</span>
      </div>

     <UserFollow  userId={id} following={data?.following} followers={data?.followers}/>

<UserPosts userPosts={data?.posts} userName={data?.name}/>
    </div>
  </div>
  )
}

export default UserProfile