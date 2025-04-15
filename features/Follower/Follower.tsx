"use client"
import { fetcher } from '@/lib/fetcher';
import FollowerList from './components/FollowerList'
import { useParams } from 'next/navigation'
import useSWR from 'swr';

const Follower = () => {
    const params = useParams();
    const id = params.id as string | undefined
    const { data: followers,error,isLoading} = useSWR(id ? `/api/followers/${id}` : null ,fetcher);

    if (isLoading) return <p className='pt-20 px-4'>Loading...</p>;
    if (error) return <p className='pt-20 px-4'>エラーが発生しました</p>;
    if (!followers) return <p className='pt-20 px-4'>フォワーが見つかりませんでした</p>;
  return (
    <div className="max-w-2xl mx-auto mt-14 px-[4%] pb-20">
    <FollowerList followersData={followers}/>
    </div>
  )
}

export default Follower