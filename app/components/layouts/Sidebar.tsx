"use client"
import Logout from '@/features/Logout/components/Logout'
import { supabase } from '@/lib/supabase';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
  const [user,setUser] =useState<any>(null);
   // セッション情報を取得
   useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user);
      
    };
    getSession()
})
     
  return (
    <nav className='fixed top-0 left-0 w-1/5 bg-amber-50 h-dvh'>
       
        <div className="flex flex-col  items-center w-full mt-14">
  <div className='flex flex-col gap-4 text-lg'>
  
        <Link href="/">
    <div className='flex'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

<span>ホーム</span>
</div>
</Link>

    <Link href="/notification">
    <div className='flex'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
<span>通知</span>
</div>
</Link>

<Link href="/user">
    <div className='flex'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

<span>プロフィール</span>
</div>
</Link>

{user ? 
<Logout/>:"ログインする"
}
    </div>
  </div>
        </nav>
  )
}

export default Sidebar