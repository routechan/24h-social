import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();


  // Supabase でセッションを取得（クッキーを利用）
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return res;
}

// API のみに適用
export const config = {
  matcher: "/api/post", // `/api/post` 以下のすべてのエンドポイントに適用
};
