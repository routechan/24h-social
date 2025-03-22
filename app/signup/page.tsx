import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignUpForm from '@/features/SignUp/components/SignUpForm/SignUpForm'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-[4%]'>
    <Card className='w-[400px] mx-auto bg-white '>
    <CardHeader>
          <CardTitle className='text-2xl'>アカウント作成</CardTitle>
          <CardDescription>必要な情報を入力してアカウントを作成してください</CardDescription>
        </CardHeader>
        <SignUpForm/>
  </Card>
  </div>
  )
}

export default SignUpPage

