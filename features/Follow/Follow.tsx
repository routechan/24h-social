"use client"
import React from 'react'
import FollowList from './components/FollowList'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

const Follow = () => {
    const params = useParams();
    const id = params?.id as string | undefined

    const { data: follows,error,isLoading} = useSWR(id ? `/api/follows/${id}` : null ,fetcher);
    
    if (isLoading) return <p className='pt-20 px-4'>Loading...</p>;
    if (error) return <p className='pt-20 px-4'>エラーが発生しました</p>;
    if (!follows) return <p className='pt-20 px-4'>フォローしているが見つかりませんでした</p>;
  return (
    <div className="max-w-2xl mx-auto mt-14 px-[4%] pb-20">
      <FollowList followsData={follows}/>
    </div>
  )
}

export default Follow