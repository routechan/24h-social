import {  PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

const prisma =new PrismaClient();

// ログイン認証用API
export async function POST(req:Request){
    const { email,password } =await req.json();
    // 入力されたメールアドレスと一致するユーザーを取得
    try{
const user = await prisma.user.findUnique({where:{email}})
// 一致するユーザーがいなければ401を返す
if(!user){
    return NextResponse.json(user,{status:401})
}
// bcryptでパスワードが正しいか比較
const isPasswordValid = await bcrypt.compare(password,user.password);
// 正しくなければ401を返す
if(!isPasswordValid){
    return NextResponse.json(user,{status:401})
}
return NextResponse.json(user,{status:200})

}catch(err){
      return NextResponse.json(err,{status:500})
    }
}