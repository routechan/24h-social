import { supabase } from "@/lib/supabase";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Prisma クライアントのインスタンスを作成
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Supabase Auth でユーザー登録
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      console.error("Supabase Auth Error:", signUpError.message);
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // Supabase ユーザー ID を取得
    const supabaseId = data.user?.id;
    if (!supabaseId) {
      console.error("Supabase user ID is missing.");
      return NextResponse.json({ error: "Supabase user ID is missing" }, { status: 500 });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prisma でユーザー作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
       // supabaseId,  Supabase の ID を保存
      },
    });

    console.log("User created:", user);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
