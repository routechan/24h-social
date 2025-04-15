   "use server"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";




const prisma =new PrismaClient();

// 投稿を追加
export async function createPost(message:string,userId:string) {

    try{
        const postResponse = await prisma.post.create({
            data:{
              content:message,
              userId
            }
        })
        revalidatePath("/")
     
        return postResponse
            }catch(err){
                console.error(err)
                return {error:"ポストに失敗"}
            }
  }