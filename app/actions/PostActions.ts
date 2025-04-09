   "use server"
import { uploadImage } from "@/lib/uploadImage";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";




const prisma =new PrismaClient();

// 投稿を追加
export async function createPost(message:string,imageFile: File | null,userId:string) {
 let imageUrl = null
    if(imageFile){
    imageUrl = await uploadImage(imageFile)
    }
    console.log(imageUrl)

    try{
        const postResponse = await prisma.post.create({
            data:{
              content:message,
              image_url:imageUrl,
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