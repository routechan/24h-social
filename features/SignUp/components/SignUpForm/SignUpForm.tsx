"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../../types/formvalues';
import { CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { registerUser } from '@/app/actions/authActions';

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(); // react-hook-form

  // 登録を押すとapiに入力データをpost
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { name, email, password } = data;

      const response = await registerUser(name, email, password);

      // 新規登録に成功すれば登録メールアドレス宛にメールを送信
      if (response.error) {
        console.error("登録に失敗しました", response.error);
      } else {
        window.alert("メールアドレス宛にメールを送信しました")
      }
    } catch (err) {
      console.error("登録エラー:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full text-sm">
         <CardContent className="space-y-4">
      <label htmlFor="name">ユーザーネーム(10文字以内)</label>
      <Input
        id="name"
        type="text"
        {...register("name", {
          required: "名前を入力してください",
          maxLength: { value: 10, message: "10文字以内で入力してください" },
        })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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

      <label htmlFor="password">パスワード(6桁以上)</label>
      <Input
        id="password"
        type="password"
        {...register("password", {
          required: "パスワードを入力してください",
          minLength: { value: 6, message: "6文字以上入力してください" },
        })}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <Button type="submit" className="w-full bg-green-500 text-white cursor-pointer">アカウント作成</Button>
      <Link href="/login" className='text-blue-500 border-blue-500 border-b cursor-pointer'>ログインはこちら</Link>
      </CardContent>
    </form>
  );
};

export default SignUpForm;