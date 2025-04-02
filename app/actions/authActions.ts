"use server";
import { supabase } from "@/lib/supabase";
import { PrismaClient } from "@prisma/client";

// Prisma クライアントのインスタンスを作成
const prisma = new PrismaClient();

// 新規ユーザー登録
export async function registerUser(name: string, email: string, password: string) {
    try {
        // Supabase Auth でユーザー登録
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
            console.error("Supabase Auth Error:", signUpError.message);
            return { error: signUpError.message };
        }

        // Supabase ユーザー ID を取得
        const supabaseId = data.user?.id;
        if (!supabaseId) {
            console.error("Supabase user ID is missing.");
            return { error: "Supabase user ID is missing" };
        }

        // Prisma でユーザー作成
        const user = await prisma.user.create({
            data: {
                id: supabaseId.toString(),
                name,
                email,
            },
        });

        // プロフィール作成
        const profile = await prisma.profile.create({
            data: {
                bio: "はじめまして！",
                avatarUrl: "https://github.com/shadcn.png",
                userId: supabaseId.toString(),
            },
        });

        console.log("User created:", user);
        return { user, profile };
    } catch (err) {
        console.error("Server Error:", err);
        return { error: "Internal Server Error" };
    }
}
