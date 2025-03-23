"use client"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../types/loginValues";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { useState } from "react";


const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>(); // react-hook-form
    const router = useRouter();
    const [loginError,setLoginError] = useState<null | boolean>(null)

    const onSubmit:SubmitHandler<LoginValues> = async(data)=>{
        
        const {  email, password } = data;
      const response =  await loginUser(email,password);
      if(response.status === 200){
        console.log("ログイン成功")
        router.push("/")
      }else {
        console.error("ログインに失敗しました", response);
        setLoginError(true)
      }
      
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full text-sm">
    <CardContent className="space-y-4">

 <label htmlFor="email">メールアドレス</label>
 <Input
   id="email"
   type="email"
   {...register("email", {
     required: "メールアドレスを入力してください",
     pattern: {
       value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
       message: "有効なメールアドレスを入力してください",
     },
   })}
 />
 {errors.email && <p className="text-red-500">{errors.email.message}</p>}

 <label htmlFor="password">パスワード</label>
 <Input
   id="password"
   type="password"
   {...register("password", {
     required: "パスワードを入力してください",
     minLength: { value: 6, message: "6文字以上入力してください" },
   })}
 />
 {errors.password && <p className="text-red-500">{errors.password.message}</p>}

 {loginError && <p className="text-red-500">メールアドレスかパスワードに誤りがあります。</p>}
 <Button type="submit" className="w-full bg-green-500 text-white cursor-pointer">ログイン</Button>
 </CardContent>
 
</form>
  )
}

export default LoginForm