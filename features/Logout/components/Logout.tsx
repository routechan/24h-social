"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import React from 'react'

const Logout = () => {
const router = useRouter()

  const logout = async()=>{ 
     try{
        const { error:logoutError } = await supabase.auth.signOut()
        if (logoutError) {
          throw logoutError;
        }
        await router.push("/login");
      }catch{
        alert('エラーが発生しました');
      }
    }

  return (
    <Button onClick={logout} className='bg-slate-600 text-white cursor-pointer'>
        ログアウト
    </Button>
  )
}

export default Logout