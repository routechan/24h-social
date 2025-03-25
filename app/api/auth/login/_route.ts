import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


// ログイン認証用API
export async function POST(req:Request){
    const { email,password } =await req.json();
    // 入力されたメールアドレスと一致するユーザーを取得
    try{

const { error } = await supabase.auth.signInWithPassword({ email, password });

if (error) {
  console.log(error)
  return NextResponse.json({ error: error.message }, { status: 401 });
} else {
  console.log("ログイン成功！");
  return NextResponse.json({status:200})
}


}catch(err){
      return NextResponse.json(err,{status:500})
    }
}