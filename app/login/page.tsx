import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '@/features/Login/components/LoginForm'


const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-[4%]'>
    <Card className='w-[400px] mx-auto bg-white '>
    <CardHeader>
          <CardTitle className='text-2xl'>ログイン</CardTitle>
          <CardDescription>必要な情報を入力してログインしてください</CardDescription>
        </CardHeader>
       <LoginForm/>
  </Card>
  </div>
  )
}

export default LoginPage