import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";

export const uploadImage = async (file) => {

    const uniqueId = uuidv4()
  const filePath = `posts/${uniqueId}`; // ユニークなファイル名を生成

  const { data, error } = await supabase.storage
    .from("pictures") // バケット名
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // 同じ名前のファイルがあったら上書きしない
    });

  if (error) {
    console.error("画像アップロードエラー:", error.message);
    return null;
  }

  // 公開 URL を取得
  const { data: urlData } = supabase.storage.from("pictures").getPublicUrl(filePath);
  return urlData.publicUrl; // 画像のURLを返す
};
